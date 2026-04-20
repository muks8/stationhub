import bcrypt
from fastapi import APIRouter, HTTPException, status
from src.database import get_connection
from src.models import LoginRequest, LoginResponse
from src.auth import create_access_token

router = APIRouter()


@router.post("/login", response_model=LoginResponse)
def login(body: LoginRequest):
    conn = get_connection()
    try:
        cursor = conn.cursor()
        cursor.execute(
            "SELECT id, username, password_hash, display_name FROM users WHERE username = ?",
            (body.username,)
        )
        row = cursor.fetchone()
    finally:
        conn.close()

    if row is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password"
        )

    user_id, username, password_hash, display_name = row

    if not bcrypt.checkpw(body.password.encode("utf-8"), password_hash.encode("utf-8")):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password"
        )

    token = create_access_token({"sub": user_id, "username": username})

    return LoginResponse(token=token, username=username, display_name=display_name)
