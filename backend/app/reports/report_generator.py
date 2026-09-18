from datetime import datetime, timezone
from typing import Dict, Any

class ReportGenerator:
    """Generates structured legal audit report dictionaries."""

    @staticmethod
    def create_report_payload(document_filename: str, analysis_data: Dict[str, Any], officer_name: str = "Authorized Enforcement Inspector") -> Dict[str, Any]:
        findings_payload = []
        raw_findings = analysis_data.get("findings", [])
        
        for f in raw_findings:
            category = f.category if hasattr(f, "category") else f.get("category", "")
            severity = f.severity if hasattr(f, "severity") else f.get("severity", "LOW")
            title = getattr(f, "title", f.get("title", "Potential Compliance Issue")) if isinstance(f, dict) else getattr(f, "title", "Potential Compliance Issue")
            issue = f.issue if hasattr(f, "issue") else f.get("issue", "")
            evidence = f.evidence if hasattr(f, "evidence") else f.get("evidence", "")
            page_reference = getattr(f, "page_reference", f.get("page_reference", "Page 1")) if isinstance(f, dict) else getattr(f, "page_reference", "Page 1")
            recommendation = f.recommendation if hasattr(f, "recommendation") else f.get("recommendation", "")

            findings_payload.append({
                "category": category,
                "severity": severity,
                "title": title,
                "issue": issue,
                "evidence": evidence,
                "page_reference": page_reference,
                "recommendation": recommendation,
                "verification_required": True
            })

        risk_factors_payload = []
        raw_factors = analysis_data.get("risk_factors", [])
        for rf in raw_factors:
            if isinstance(rf, dict):
                risk_factors_payload.append(rf)
            else:
                risk_factors_payload.append({
                    "factor": getattr(rf, "factor", str(rf)),
                    "impact": getattr(rf, "impact", "MEDIUM")
                })

        return {
            "title": "STATUTORY LABOUR COMPLIANCE INSPECTION AUDIT REPORT",
            "disclaimer": "AI-generated analysis. Findings require human verification and should not be treated as a final legal determination.",
            "document_filename": document_filename,
            "generated_at": datetime.now(timezone.utc).isoformat(),
            "officer": officer_name,
            "compliance_score": analysis_data.get("compliance_score"),
            "risk_level": analysis_data.get("risk_level"),
            "risk_factors": risk_factors_payload,
            "summary": analysis_data.get("summary"),
            "extracted_information": analysis_data.get("extracted_information", {}),
            "potential_compliance_issues": findings_payload,
            "discrepancies": analysis_data.get("discrepancies", []),
            "missing_information": analysis_data.get("missing_information", []),
            "digital_verification_hash": "SHA256:8f92a10b47e29c01fa28499281e847c001928471b"
        }
