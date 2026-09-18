import logging
from app.database.connection import engine
from app.models import Base

logger = logging.getLogger("labourguard.init_db")

def init_db():
    """Initializes PostgreSQL database tables if connected."""
    if engine is None:
        logger.warning("Database engine unavailable. Skipping table initialization.")
        return
    try:
        Base.metadata.create_all(bind=engine)
        logger.info("PostgreSQL database tables initialized successfully.")
    except Exception as e:
        logger.warning(f"Failed to initialize PostgreSQL tables: {e}")
