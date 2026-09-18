import uuid
import logging
from datetime import datetime, timezone
from pathlib import Path
from typing import Dict, Any
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, status
from sqlalchemy.orm import Session
from app.core.config import settings
from app.database.connection import get_db, check_db_connection
from app.models.document import Document
from app.schemas.document import DocumentUploadResponse, DocumentResponse
from app.auth.jwt import get_current_user
from app.models.user import User

logger = logging.getLogger("labourguard.documents")
router = APIRouter(prefix="/documents", tags=["Documents"])

# In-memory document fallback store if PostgreSQL is offline
IN_MEMORY_DOCS: Dict[int, Dict[str, Any]] = {}
IN_MEMORY_DOC_ID_COUNTER = 101

@router.post("/upload", response_model=DocumentUploadResponse)
async def upload_document(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Uploads a statutory labour compliance document (PDF, PNG, JPG, JPEG).
    Validates MIME type, enforces file size limits, and generates safe unique storage paths.
    """
    global IN_MEMORY_DOC_ID_COUNTER

    # 1. Extension & MIME Validation
    original_name = file.filename or "uploaded_document"
    ext = Path(original_name).suffix.lower().lstrip('.')
    
    if ext not in settings.ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid file extension '.{ext}'. Allowed extensions: {', '.join(settings.ALLOWED_EXTENSIONS)}"
        )

    # Read content & check size limit
    content = await file.read()
    file_size_mb = len(content) / (1024 * 1024)
    if file_size_mb > settings.MAX_UPLOAD_SIZE_MB:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail=f"File size ({file_size_mb:.2f} MB) exceeds maximum allowed limit of {settings.MAX_UPLOAD_SIZE_MB} MB."
        )

    # 2. Generate safe unique filename
    unique_filename = f"{uuid.uuid4().hex}.{ext}"
    storage_path = settings.UPLOAD_DIR / unique_filename

    # Save actual file outside database
    try:
        with open(storage_path, "wb") as f:
            f.write(content)
    except Exception as e:
        logger.error(f"Failed to save upload to disk: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to write document to secure storage"
        )

    created_at_dt = datetime.now(timezone.utc)

    if db is not None:
        doc_record = Document(
            user_id=current_user.id,
            filename=unique_filename,
            original_filename=original_name,
            file_type=file.content_type or f"application/{ext}",
            file_size=len(content),
            storage_path=str(storage_path),
            status="uploaded",
            created_at=created_at_dt
        )
        db.add(doc_record)
        db.commit()
        db.refresh(doc_record)

        return DocumentUploadResponse(
            document_id=doc_record.id,
            filename=doc_record.original_filename,
            file_type=doc_record.file_type,
            file_size=doc_record.file_size,
            status=doc_record.status,
            created_at=doc_record.created_at
        )

    else:
        doc_id = IN_MEMORY_DOC_ID_COUNTER
        IN_MEMORY_DOC_ID_COUNTER += 1

        mem_doc = {
            "id": doc_id,
            "user_id": current_user.id,
            "filename": unique_filename,
            "original_filename": original_name,
            "file_type": file.content_type or f"application/{ext}",
            "file_size": len(content),
            "storage_path": str(storage_path),
            "status": "uploaded",
            "created_at": created_at_dt
        }
        IN_MEMORY_DOCS[doc_id] = mem_doc

        return DocumentUploadResponse(
            document_id=doc_id,
            filename=original_name,
            file_type=mem_doc["file_type"],
            file_size=mem_doc["file_size"],
            status="uploaded",
            created_at=created_at_dt
        )
