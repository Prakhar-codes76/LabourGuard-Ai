from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, Text, Float, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from app.database.connection import Base

class Analysis(Base):
    __tablename__ = "analyses"

    id = Column(Integer, primary_key=True, index=True)
    document_id = Column(Integer, ForeignKey("documents.id"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    status = Column(String(50), nullable=False, default="PENDING") # PENDING, PROCESSING, COMPLETED, FAILED, OCR_REQUIRED, OCR_UNAVAILABLE, AI_UNAVAILABLE
    summary = Column(Text, nullable=True)
    document_type = Column(String(100), nullable=True, default="Labour Audit Register")
    extracted_information = Column(JSON, nullable=True)
    compliance_score = Column(Float, nullable=False, default=100.0)
    risk_level = Column(String(50), nullable=False, default="LOW") # LOW, MEDIUM, HIGH
    risk_factors = Column(JSON, nullable=True)
    missing_information = Column(JSON, nullable=True)
    discrepancies = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    completed_at = Column(DateTime, nullable=True)
    error_message = Column(Text, nullable=True)

    document = relationship("Document", back_populates="analyses")
    findings = relationship("ComplianceFinding", back_populates="analysis", cascade="all, delete-orphan")
    reports = relationship("Report", back_populates="analysis", cascade="all, delete-orphan")
