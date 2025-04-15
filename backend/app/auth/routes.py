from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.database import supabase
from app.models import UserSignup
from app.auth.jwt_utils import verify_jwt
import bcrypt
import logging

router = APIRouter()
auth_scheme = HTTPBearer()

def hash_password(password: str) -> str:
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed.decode('utf-8')


@router.post("/auth/signup")
async def signup(user: UserSignup):
    try:
        response = supabase.auth.sign_up({
            "email": user.email,
            "password": user.password,
            "data": {
                "username": user.username,
                "role": user.role
            }
        })
    except Exception as e:
        logging.exception("Error during signup")
        raise HTTPException(status_code=400, detail=str(e))
    
    hashed_password = hash_password(user.password)

    try:
        profile_response = supabase.table("users").insert({
            "id": response.user.id,
            "email": user.email,
            "password": hashed_password,  
            "username": user.username,
            "role": user.role
        }).execute()
    except Exception as e:
        logging.exception("Error inserting user profile")
        raise HTTPException(status_code=400, detail=str(e))
    
    return {
        "message": f"{user.role} signed up successfully.",
        "auth_data": response,
        "profile_data": profile_response
    }