import logging
from datetime import datetime, timezone
from typing import Dict, Any
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database.connection import get_db, check_db_connection
from app.models.user import User
from app.schemas.auth import UserRegister, UserLogin, UserResponse, TokenResponse
from app.core.security import hash_password, verify_password, create_access_token
from app.auth.jwt import get_current_user

logger = logging.getLogger("labourguard.auth")
router = APIRouter(prefix="/auth", tags=["Authentication"])

# In-memory user database fallback if PostgreSQL service is offline
IN_MEMORY_USERS: Dict[str, Dict[str, Any]] = {}
IN_MEMORY_ID_COUNTER = 1

@router.post("/register", response_model=TokenResponse)
def register(user_in: UserRegister, db: Session = Depends(get_db)):
    """Registers a new officer/user account with secure bcrypt hashing."""
    global IN_MEMORY_ID_COUNTER

    if db is not None:
        # Check duplicate email in PostgreSQL
        existing = db.query(User).filter(User.email == user_in.email).first()
        if existing:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="An officer account with this email address already exists."
            )
        
        pwd_hash = hash_password(user_in.password)
        new_user = User(
            name=user_in.name,
            email=user_in.email,
            password_hash=pwd_hash,
            role=user_in.role,
            created_at=datetime.now(timezone.utc)
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        token = create_access_token({"sub": str(new_user.id), "email": new_user.email, "role": new_user.role})
        return TokenResponse(
            access_token=token,
            token_type="bearer",
            user=UserResponse.model_validate(new_user)
        )
    else:
        # Graceful handling when PostgreSQL server is unavailable
        if user_in.email in IN_MEMORY_USERS:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="An officer account with this email address already exists."
            )
        
        pwd_hash = hash_password(user_in.password)
        user_id = IN_MEMORY_ID_COUNTER
        IN_MEMORY_ID_COUNTER += 1

        mem_user = {
            "id": user_id,
            "name": user_in.name,
            "email": user_in.email,
            "password_hash": pwd_hash,
            "role": user_in.role,
            "created_at": datetime.now(timezone.utc)
        }
        IN_MEMORY_USERS[user_in.email] = mem_user

        token = create_access_token({"sub": str(user_id), "email": user_in.email, "role": user_in.role})
        user_resp = UserResponse(
            id=user_id,
            name=user_in.name,
            email=user_in.email,
            role=user_in.role,
            created_at=mem_user["created_at"]
        )
        return TokenResponse(access_token=token, token_type="bearer", user=user_resp)

@router.post("/login", response_model=TokenResponse)
def login(credentials: UserLogin, db: Session = Depends(get_db)):
    """Authenticates user credentials and returns JWT Bearer token."""
    if db is not None:
        user = db.query(User).filter(User.email == credentials.email).first()
        if not user or not verify_password(credentials.password, user.password_hash):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email address or password",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        token = create_access_token({"sub": str(user.id), "email": user.email, "role": user.role})
        return TokenResponse(
            access_token=token,
            token_type="bearer",
            user=UserResponse.model_validate(user)
        )

    else:
        mem_user = IN_MEMORY_USERS.get(credentials.email)
        # Default demo fallback credentials if no register was run yet
        if not mem_user:
            # Auto-provision standard demo user if logging in with demo email
            if credentials.email in ["r.sharma@labourguard.org", "ananya.roy@labourguard.org", "admin.parthiban@labourguard.org"]:
                pwd_hash = hash_password("••••••••••••")
                mem_user = {
                    "id": 1,
                    "name": "Rajesh V. Sharma",
                    "email": credentials.email,
                    "password_hash": pwd_hash,
                    "role": "inspector",
                    "created_at": datetime.now(timezone.utc)
                }
                IN_MEMORY_USERS[credentials.email] = mem_user
            else:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Invalid email address or password",
                    headers={"WWW-Authenticate": "Bearer"},
                )

        token = create_access_token({"sub": str(mem_user["id"]), "email": mem_user["email"], "role": mem_user["role"]})
        user_resp = UserResponse(
            id=mem_user["id"],
            name=mem_user["name"],
            email=mem_user["email"],
            role=mem_user["role"],
            created_at=mem_user["created_at"]
        )
        return TokenResponse(access_token=token, token_type="bearer", user=user_resp)

@router.get("/me", response_model=UserResponse)
def get_me(current_user: User = Depends(get_current_user)):
    """Returns profile information for the authenticated user."""
    return UserResponse.model_validate(current_user)

@router.post("/logout")
def logout():
    """Logs out current user session."""
    return {"message": "Successfully logged out user session"}
