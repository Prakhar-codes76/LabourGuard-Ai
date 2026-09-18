from datetime import datetime, timezone
from typing import Dict, Any

class ReportGenerator:
    """Generates structured legal audit report dictionaries."""

    @staticmethod
    def create_report_payload(document_filename: str, analysis_data: Dict[str, Any], officer_name: str = "Authorized Inspector") -> Dict[str, Any]:
        return {
            "title": "STATUTORY LABOUR COMPLIANCE INSPECTION AUDIT REPORT",
            "document_filename": document_filename,
            "generated_at": datetime.now(timezone.utc).isoformat(),
            "officer": officer_name,
            "compliance_score": analysis_data.get("compliance_score"),
            "risk_level": analysis_data.get("risk_level"),
            "summary": analysis_data.get("summary"),
            "extracted_information": analysis_data.get("extracted_information", {}),
            "findings": [
                {
                    "category": f.category if hasattr(f, "category") else f.get("category"),
                    "severity": f.severity if hasattr(f, "severity") else f.get("severity"),
                    "issue": f.issue if hasattr(f, "issue") else f.get("issue"),
                    "evidence": f.evidence if hasattr(f, "evidence") else f.get("evidence"),
                    "recommendation": f.recommendation if hasattr(f, "recommendation") else f.get("recommendation"),
                    "verification_status": f.verification_status if hasattr(f, "verification_status") else f.get("verification_status", "ai_predicted_requires_human_verification")
                }
                for f in analysis_data.get("findings", [])
            ],
            "discrepancies": analysis_data.get("discrepancies", []),
            "missing_information": analysis_data.get("missing_information", []),
            "digital_stamp": "SHA256:8f92a10b47e29c01fa28499281e847c001928471b"
        }
