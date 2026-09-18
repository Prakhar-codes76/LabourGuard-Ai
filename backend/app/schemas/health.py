from pydantic import BaseModel

class HealthResponse(BaseModel):
    api: str = "operational"
    database: str # "connected" or "unavailable"
    ai_service: str # "configured" or "not_configured"
