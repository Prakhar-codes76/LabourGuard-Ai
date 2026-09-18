from typing import Dict, Any, List
from app.compliance.rules import DEMO_RULES
from app.compliance.scoring import calculate_compliance_score
from app.schemas.analysis import GeminiAnalysisResult, FindingSchema

class ComplianceEngine:
    """
    Compliance Engine that combines AI predictions with configured DEMO rules.
    Enforces human verification disclaimer flags on all potential findings.
    """

    @staticmethod
    def evaluate(ai_result: GeminiAnalysisResult) -> Dict[str, Any]:
        processed_findings: List[FindingSchema] = []

        # Process AI findings & tag with verification required flag
        for f in ai_result.findings:
            finding = FindingSchema(
                category=f.category,
                severity=f.severity.upper(),
                title=getattr(f, "title", "Potential Compliance Issue"),
                issue=f.issue,
                evidence=f.evidence,
                page_reference=getattr(f, "page_reference", "Page 1"),
                recommendation=f.recommendation,
                verification_required=True
            )
            processed_findings.append(finding)

        # Check DEMO rules against missing information
        missing = list(ai_result.missing_information or [])
        discrepancies = list(ai_result.discrepancies or [])

        # Add DEMO rule matches if missing key registration fields
        if not ai_result.extracted_information.get("registration_number") or ai_result.extracted_information.get("registration_number") == "N/A":
            if not any(f.category == "STATUTORY_REGISTRATION" for f in processed_findings):
                processed_findings.append(FindingSchema(
                    category="STATUTORY_REGISTRATION",
                    severity="MEDIUM",
                    title="Missing Registration Number (DEMO Rule Match)",
                    issue="Establishment registration number is unspecified in extracted metadata.",
                    evidence="Document header missing statutory registration code.",
                    page_reference="Page 1",
                    recommendation="Verify establishment registration certificate under Contract Labour Act.",
                    verification_required=True
                ))
                if "Establishment Registration Code" not in missing:
                    missing.append("Establishment Registration Code")

        # Run transparent risk scoring algorithm
        score_res = calculate_compliance_score(processed_findings, missing, discrepancies)

        return {
            "summary": ai_result.summary,
            "document_type": ai_result.document_type,
            "extracted_information": ai_result.extracted_information,
            "missing_information": missing,
            "discrepancies": discrepancies,
            "findings": processed_findings,
            "compliance_score": score_res["compliance_score"],
            "risk_level": score_res["risk_level"],
            "risk_factors": score_res["risk_factors"]
        }
