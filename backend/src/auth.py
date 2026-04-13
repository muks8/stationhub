import bcrypt
import os
from datetime import datetime, timedelta
from jose import JWTError, jwt

JWT_SECRET  = os.getenv("JWT_SECRET", "changeme")
JWT_EXPIRE  = int(os.getenv("JWT_EXPIRE_MINUTES", 1440))
ALGORITHM   = "HS256"

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()

def verify_password(password: str, hashed: str) -> bool:
    return bcrypt.checkpw(password.encode(), hashed.encode())

def create_token(data: dict) -> str:
    payload = data.copy()
    payload["exp"] = datetime.utcnow() + timedelta(minutes=JWT_EXPIRE)
    return jwt.encode(payload, JWT_SECRET, algorithm=ALGORITHM)

def decode_token(token: str) -> dict:
    try:
        return jwt.decode(token, JWT_SECRET, algorithms=[ALGORITHM])
    except JWTError:
        return None