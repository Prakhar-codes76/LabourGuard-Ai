from typing import List, Dict, Any
from app.schemas.analysis import FindingSchema, RiskFactorSchema

def calculate_compliance_score(
    findings: List[FindingSchema], 
    missing_information: List[str], 
    discrepancies: List[str]
) -> Dict[str, Any]:
    """
    Deterministic, explainable compliance score and risk level calculation algorithm.
    """
    base_score = 100.0

    high_count = sum(1 for f in findings if getattr(f, "severity", "").upper() == "HIGH")
    med_count = sum(1 for f in findings if getattr(f, "severity", "").upper() == "MEDIUM")
    low_count = sum(1 for f in findings if getattr(f, "severity", "").upper() == "LOW")

    missing_count = len(missing_information or [])
    discrepancy_count = len(discrepancies or [])

    # Deductions: HIGH = -12, MEDIUM = -7, LOW = -3, Missing Field = -5, Discrepancy = -8
    deductions = (high_count * 12.0) + (med_count * 7.0) + (low_count * 3.0) + (missing_count * 5.0) + (discrepancy_count * 8.0)
    score = max(0.0, min(100.0, base_score - deductions))

    if score < 65.0:
        risk_level = "HIGH"
    elif score < 85.0:
        risk_level = "MEDIUM"
    else:
        risk_level = "LOW"

    risk_factors: List[RiskFactorSchema] = []

    if high_count > 0:
        risk_factors.append(RiskFactorSchema(
            factor=f"{high_count} high-severity potential compliance issue{'s' if high_count > 1 else ''}",
            impact="HIGH"
        ))

    if discrepancy_count > 0:
        risk_factors.append(RiskFactorSchema(
            factor=f"{discrepancy_count} internal document discrepancy{'ies' if discrepancy_count > 1 else ''} detected",
            impact="HIGH" if discrepancy_count > 1 else "MEDIUM"
        ))

    if missing_count > 0:
        risk_factors.append(RiskFactorSchema(
            factor=f"{missing_count} missing required document field{'s' if missing_count > 1 else ''}",
            impact="MEDIUM" if missing_count <= 2 else "HIGH"
        ))

    if med_count > 0:
        risk_factors.append(RiskFactorSchema(
            factor=f"{med_count} medium-severity finding{'s' if med_count > 1 else ''} requiring verification",
            impact="MEDIUM"
        ))

    if not risk_factors:
        risk_factors.append(RiskFactorSchema(
            factor="Standard routine compliance audit required",
            impact="LOW"
        ))

    return {
        "compliance_score": round(score, 1),
        "risk_level": risk_level,
        "risk_factors": risk_factors
    }
