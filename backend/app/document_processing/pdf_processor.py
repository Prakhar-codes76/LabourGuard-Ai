import logging
from pathlib import Path
from typing import Dict, Any
from pypdf import PdfReader

logger = logging.getLogger("labourguard.pdf_processor")

class PDFProcessor:
    """Extracts machine-readable text from PDF files preserving page structure."""

    @staticmethod
    def process_pdf(file_path: str) -> Dict[str, Any]:
        path = Path(file_path)
        if not path.exists():
            raise FileNotFoundError(f"PDF file not found at {file_path}")

        page_count = 0
        page_texts = []
        full_text_list = []

        try:
            reader = PdfReader(path)
            page_count = len(reader.pages)
            for idx, page in enumerate(reader.pages, start=1):
                raw_page_text = page.extract_text() or ""
                cleaned = raw_page_text.strip()
                page_texts.append({
                    "page_number": idx,
                    "text": cleaned,
                    "char_count": len(cleaned)
                })
                if cleaned:
                    full_text_list.append(f"[Page {idx}]\n{cleaned}")
        except Exception as e:
            logger.error(f"Error reading PDF {file_path}: {e}")

        combined_text = "\n\n".join(full_text_list).strip()
        is_insufficient = len(combined_text) < 30

        return {
            "document_type": "pdf",
            "pages_processed": page_count,
            "text": combined_text,
            "page_details": page_texts,
            "is_insufficient": is_insufficient,
            "extraction_method": "pdf_text"
        }
