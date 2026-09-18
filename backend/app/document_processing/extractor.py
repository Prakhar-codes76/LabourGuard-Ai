import logging
from pathlib import Path
from typing import Dict, Any
from app.document_processing.pdf_processor import PDFProcessor
from app.document_processing.ocr_processor import ocr_processor
from app.document_processing.image_processor import ImageProcessor

logger = logging.getLogger("labourguard.extractor")

class DocumentExtractor:
    """Unified Document Processing Pipeline for PDFs, scanned documents, and images."""

    @staticmethod
    def extract(file_path: str, filename: str) -> Dict[str, Any]:
        path = Path(file_path)
        if not path.exists():
            raise FileNotFoundError(f"Document file not found at {file_path}")

        ext = path.suffix.lower().lstrip('.')

        if ext == "pdf":
            pdf_res = PDFProcessor.process_pdf(file_path)
            
            # If PDF text extraction is insufficient (scanned PDF), attempt OCR
            if pdf_res["is_insufficient"]:
                logger.info(f"Machine-readable text insufficient for {filename}. Checking OCR...")
                ocr_res = ocr_processor.process_document(file_path, file_type="pdf")
                if ocr_res["ocr_used"] and ocr_res["text"]:
                    return {
                        "document_type": "pdf_scanned",
                        "pages_processed": pdf_res["pages_processed"],
                        "extraction_method": "ocr",
                        "text": ocr_res["text"],
                        "ocr_used": True,
                        "ocr_available": True,
                        "is_insufficient": False
                    }
                else:
                    return {
                        "document_type": "pdf_scanned",
                        "pages_processed": pdf_res["pages_processed"],
                        "extraction_method": "insufficient_text",
                        "text": f"[Scanned PDF Document: '{filename}'. Text extraction returned insufficient characters and OCR engine is not configured.]",
                        "ocr_used": False,
                        "ocr_available": ocr_processor.is_configured(),
                        "is_insufficient": True,
                        "ocr_status": ocr_res["status"]
                    }

            return {
                "document_type": "pdf",
                "pages_processed": pdf_res["pages_processed"],
                "extraction_method": "pdf_text",
                "text": pdf_res["text"],
                "ocr_used": False,
                "ocr_available": ocr_processor.is_configured(),
                "is_insufficient": False
            }

        elif ext in ["png", "jpg", "jpeg"]:
            img_res = ImageProcessor.process_image(file_path)
            return {
                "document_type": f"image_{ext}",
                "pages_processed": 1,
                "extraction_method": img_res["extraction_method"],
                "text": img_res["text"] if img_res["text"] else f"[Image File: '{filename}'. OCR engine is not configured.]",
                "ocr_used": img_res["ocr_used"],
                "ocr_available": img_res["ocr_available"],
                "is_insufficient": not bool(img_res["text"]),
                "ocr_status": img_res.get("ocr_status")
            }

        else:
            try:
                with open(path, "r", encoding="utf-8", errors="ignore") as f:
                    text_content = f.read().strip()
                return {
                    "document_type": f"text_{ext}",
                    "pages_processed": 1,
                    "extraction_method": "raw_text",
                    "text": text_content,
                    "ocr_used": False,
                    "ocr_available": ocr_processor.is_configured(),
                    "is_insufficient": len(text_content) < 30
                }
            except Exception as e:
                logger.error(f"Failed to read file {file_path}: {e}")
                return {
                    "document_type": "unknown",
                    "pages_processed": 0,
                    "extraction_method": "failed",
                    "text": f"[File read error: {str(e)}]",
                    "ocr_used": False,
                    "ocr_available": ocr_processor.is_configured(),
                    "is_insufficient": True
                }
