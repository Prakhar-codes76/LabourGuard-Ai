from app.compliance.scoring import calculate_compliance_score
from app.schemas.analysis import FindingSchema

def test_risk_scoring_calculation():
    findings = [
        FindingSchema(
            category="Minimum Wages Discrepancy",
            severity="HIGH",
            title="Base Wage Rate Below Statutory Minimum",
            issue="Base daily wage below statutory minimum schedule",
            evidence="₹450 vs ₹520",
            recommendation="Adjust base wage rates",
            verification_required=True
        ),
        FindingSchema(
            category="Safety & PPE Non-Compliance",
            severity="MEDIUM",
            title="Uncertified PPE Inspection Log",
            issue="Uncertified PPE log",
            evidence="Seal missing",
            recommendation="Recertify PPE gear",
            verification_required=True
        )
    ]

    missing_info = ["Establishment Registration Code"]
    discrepancies = ["Worker count mismatch"]

    res = calculate_compliance_score(findings, missing_info, discrepancies)
    
    assert "compliance_score" in res
    assert "risk_level" in res
    assert "risk_factors" in res
    assert 0 <= res["compliance_score"] <= 100
    assert res["risk_level"] in ["LOW", "MEDIUM", "HIGH"]
    assert len(res["risk_factors"]) > 0
