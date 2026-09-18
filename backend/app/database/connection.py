import logging
from typing import Generator
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker, Session, declarative_base
from app.core.config import settings

logger = logging.getLogger("labourguard.database")

# Create SQLAlchemy engine for PostgreSQL
try:
    engine = create_engine(
        settings.DATABASE_URL,
        pool_pre_ping=True,
        pool_size=10,
        max_overflow=20,
        connect_args={"connect_timeout": 5}
    )
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
except Exception as e:
    logger.error(f"Failed to create database engine: {e}")
    engine = None
    SessionLocal = None

Base = declarative_base()

def get_db() -> Generator[Optional[Session], None, None]:
    """Dependency for obtaining database session. Yields None if PostgreSQL is offline."""
    if check_db_connection() != "connected" or SessionLocal is None:
        yield None
        return
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def check_db_connection() -> str:
    """
    Explicit health check for PostgreSQL connection.
    Returns 'connected' if PostgreSQL responds, otherwise 'unavailable'.
    """
    if engine is None:
        return "unavailable"
    try:
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
            return "connected"
    except Exception as e:
        logger.warning(f"PostgreSQL health check failed: {e}")
        return "unavailable"
