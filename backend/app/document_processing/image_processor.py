import logging
from pathlib import Path
from typing import Dict, Any
from app.document_processing.ocr_processor import ocr_processor

logger = logging.getLogger("labourguard.image_processor")

class ImageProcessor:
    """Processes image files (JPG, JPEG, PNG) through OCR extraction."""

    @staticmethod
    def process_image(file_path: str) -> Dict[str, Any]:
        path = Path(file_path)
        if not path.exists():
            raise FileNotFoundError(f"Image file not found at {file_path}")

        ext = path.suffix.lower().lstrip('.')
        
        # Route through OCR processor
        ocr_res = ocr_processor.process_document(file_path, file_type=ext)

        return {
            "document_type": f"image_{ext}",
            "pages_processed": 1,
            "extraction_method": "ocr" if ocr_res["ocr_used"] else "ocr_unavailable",
            "text": ocr_res["text"],
            "ocr_used": ocr_res["ocr_used"],
            "ocr_available": ocr_res["ocr_available"],
            "ocr_status": ocr_res["status"],
            "message": ocr_res.get("message", "")
        }
