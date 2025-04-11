import jwt
from fastapi import HTTPException
from app.config import SUPABASE_JWT_SECRET

def verify_jwt(token: str):
    """
    Decode the JWT token using the Supabase JWT secret.
    Raises an HTTPException for an invalid token.
    """
    try:
        payload = jwt.decode(token, SUPABASE_JWT_SECRET, algorithms=["HS256"])
        return payload
    except jwt.PyJWTError as e:
        raise HTTPException(status_code=401, detail="Invalid token") from e
