from app.compliance.scoring import RiskScorer
from app.schemas.analysis import FindingSchema

def test_risk_scoring_calculation():
    findings = [
        FindingSchema(
            category="Minimum Wages Discrepancy",
            severity="HIGH",
            issue="Base daily wage below statutory minimum schedule",
            evidence="₹450 vs ₹520",
            recommendation="Adjust wages"
        ),
        FindingSchema(
            category="Safety & PPE Non-Compliance",
            severity="MEDIUM",
            issue="Uncertified PPE log",
            evidence="Seal missing",
            recommendation="Recertify PPE"
        )
    ]

    res = RiskScorer.calculate_score(findings, base_score=100.0)
    assert res["high_risk_count"] == 1
    assert res["medium_risk_count"] == 1
    assert res["low_risk_count"] == 0
    # Deductions: 100 - (15 + 8) = 77.0
    assert res["compliance_score"] == 77.0
    assert res["risk_level"] == "MEDIUM"
