from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.database.connection import Base

class ComplianceFinding(Base):
    __tablename__ = "compliance_findings"

    id = Column(Integer, primary_key=True, index=True)
    analysis_id = Column(Integer, ForeignKey("analyses.id"), nullable=False)
    rule_id = Column(String(100), nullable=True)
    category = Column(String(255), nullable=False)
    severity = Column(String(50), nullable=False) # LOW, MEDIUM, HIGH
    title = Column(String(255), nullable=False, default="Potential Compliance Finding")
    issue = Column(Text, nullable=False)
    evidence = Column(Text, nullable=False)
    page_reference = Column(String(100), nullable=True, default="Page 1")
    recommendation = Column(Text, nullable=False)
    verification_required = Column(Boolean, nullable=False, default=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    analysis = relationship("Analysis", back_populates="findings")
