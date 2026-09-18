from fastapi import APIRouter
from app.database.connection import check_db_connection
from app.services.gemini_service import gemini_service
from app.document_processing.ocr_processor import ocr_processor

router = APIRouter(prefix="/health", tags=["Health"])

@router.get("")
def health_check():
    """
    Health check endpoint returning individual status for API, PostgreSQL Database, Gemini AI, and OCR Service.
    """
    db_raw = check_db_connection()
    db_status = "ok" if db_raw == "connected" else "unavailable"
    
    ai_status = gemini_service.is_configured()
    ocr_status = "configured" if ocr_processor.is_configured() else "not_configured"

    return {
        "api": "ok",
        "database": db_status,
        "ai_service": ai_status,
        "ocr_service": ocr_status
    }
