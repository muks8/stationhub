from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from src.database import get_connection
from src.models import LoginRequest, LoginResponse
from src.auth import verify_password, create_token, decode_token

router  = APIRouter()
security = HTTPBearer()

@router.post("/login", response_model=LoginResponse)
def login(req: LoginRequest):
    try:
        conn   = get_connection()
        cursor = conn.cursor()
        cursor.execute(
            "SELECT id, username, password_hash, display_name FROM users WHERE username=?",
            req.username
        )
        row = cursor.fetchone()
        conn.close()

        if not row or not verify_password(req.password, row[2]):
            raise HTTPException(status_code=401, detail="Invalid credentials")

        token = create_token({"sub": str(row[0]), "username": row[1]})
        return {"token": token, "username": row[1], "display_name": row[3]}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    payload = decode_token(credentials.credentials)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    return payload