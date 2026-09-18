from datetime import datetime
from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field, ConfigDict

class RiskFactorSchema(BaseModel):
    factor: str
    impact: str = Field(..., pattern="^(LOW|MEDIUM|HIGH)$")

class FindingSchema(BaseModel):
    category: str
    severity: str = Field(..., pattern="^(LOW|MEDIUM|HIGH)$")
    title: str = Field(default="Potential Compliance Finding")
    issue: str
    evidence: str
    page_reference: Optional[str] = "N/A"
    recommendation: str
    verification_required: bool = True

class ExtractedInfoSchema(BaseModel):
    employer_name: Optional[str] = "Unspecified / Not Detected"
    establishment_name: Optional[str] = "Unspecified / Not Detected"
    registration_number: Optional[str] = "N/A"
    employee_count: Optional[Any] = None
    inspection_date: Optional[str] = "N/A"
    reporting_period: Optional[str] = "N/A"

class GeminiAnalysisResult(BaseModel):
    summary: str
    document_type: str = "Labour Audit Register"
    extracted_information: Dict[str, Any] = Field(default_factory=dict)
    findings: List[FindingSchema] = Field(default_factory=list)
    missing_information: List[str] = Field(default_factory=list)
    discrepancies: List[str] = Field(default_factory=list)
    compliance_score: float = Field(..., ge=0, le=100)
    risk_level: str = Field(..., pattern="^(LOW|MEDIUM|HIGH)$")
    risk_factors: List[RiskFactorSchema] = Field(default_factory=list)

class AnalysisResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    analysis_id: int
    document_id: int
    status: str # PENDING, PROCESSING, COMPLETED, FAILED, OCR_REQUIRED, OCR_UNAVAILABLE, AI_UNAVAILABLE
    summary: str
    document_type: str
    extracted_information: Dict[str, Any]
    compliance_score: float
    risk_level: str
    risk_factors: List[RiskFactorSchema]
    missing_information: List[str]
    discrepancies: List[str]
    findings: List[FindingSchema]
    created_at: datetime
    completed_at: Optional[datetime] = None
    error_message: Optional[str] = None
