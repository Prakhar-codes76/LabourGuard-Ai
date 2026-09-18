from datetime import datetime
from pydantic import BaseModel

class DocumentResponse(BaseModel):
    id: int
    user_id: int
    filename: str
    original_filename: str
    file_type: str
    file_size: int
    status: str
    created_at: datetime

    class Config:
        from_attributes = True

class DocumentUploadResponse(BaseModel):
    document_id: int
    filename: str
    file_type: str
    file_size: int
    status: str
    created_at: datetime
