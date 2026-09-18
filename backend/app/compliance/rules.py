"""
DEMO Labour Compliance Rules Database.
Explicitly labeled DEMO rulesets for document completeness, missing registrations, and wage/safety verification.
Designed to be replaced or augmented with authoritative legal rule data in future iterations.
"""

DEMO_RULES = [
    {
        "rule_id": "DEMO-001",
        "category": "DOCUMENT_COMPLETENESS",
        "title": "Missing Employee Registration Information",
        "description": "Establishment documents must contain registered worker count and muster roll IDs.",
        "severity": "MEDIUM",
        "requires_human_verification": True
    },
    {
        "rule_id": "DEMO-002",
        "category": "STATUTORY_REGISTRATION",
        "title": "Missing Principal Employer Registration Number",
        "description": "Establishment registration number required for Contract Labour Act compliance.",
        "severity": "HIGH",
        "requires_human_verification": True
    },
    {
        "rule_id": "DEMO-003",
        "category": "MUSTER_ROLL_AUDIT",
        "title": "Inconsistent Employee Count Discrepancy",
        "description": "Reported worker count in muster roll differs from wage register deposits.",
        "severity": "HIGH",
        "requires_human_verification": True
    },
    {
        "rule_id": "DEMO-004",
        "category": "INSPECTION_TIMESTAMP",
        "title": "Missing Safety Inspection Timestamp",
        "description": "Form 25 OSH inspection log requires authorized engineer verification date.",
        "severity": "MEDIUM",
        "requires_human_verification": True
    }
]
