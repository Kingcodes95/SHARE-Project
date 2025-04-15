from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.database import supabase
from app.models import UserLogin
import bcrypt
import logging

router = APIRouter()
auth_scheme = HTTPBearer()
SESSION_TIMEOUT = 10 * 60 # 10 mins for now

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(auth_scheme)):
    try:
        token = credentials.credentials
        supabase.auth.session().access_token = token
        user = supabase.auth.get_user()
        return user
    except Exception:
        logging.exception("Invalid or expired token")
        raise HTTPException(status_code=401, detail="Invalid or expired token")

@router.post("/auth/logout")
async def logout(credentials: HTTPAuthorizationCredentials = Depends(auth_scheme)):
    try:
        token = credentials.credentials
        supabase.auth.set_session(token, "")  # If refresh token is needed, use both
        supabase.auth.sign_out()
        return {"message": "Logged out successfully"}
    except Exception as e:
        logging.exception("Logout failed")
        raise HTTPException(status_code=400, detail=f"Logout failed: {str(e)}")


@router.post('/auth/login')
async def login(user: UserLogin):

    try:
    # looks up users profile in "users" table
        profile_response = supabase.table("users").select("email", "password").eq("username", user.username).execute()
    except Exception as e:
        logging.exception("Error retrieving user")
        raise HTTPException(status_code=400, detail="Invalid username or password")
    
    # Extracts the hashed password and email from first record
    stored_hashed_password = profile_response.data[0]["password"]
    email = profile_response.data[0]["email"]

    # uses bcrypt to compare the provided password
    if not bcrypt.checkpw(user.password.encode('utf-8'), stored_hashed_password.encode('utf-8')):
        raise HTTPException(status_code=400, detail="Invalid username or password")
    
    try:
    # log the user in supabase auth
        auth_response = supabase.auth.sign_in_with_password({
            "email": email,
            "password": user.password
        })
    except Exception as e:
        logging.exception("Error signing in")
        raise HTTPException(status_code=400, detail="Invalid username or password")
    
    return {
        "message": "Logged in successfully",
        "access_token": auth_response.session.access_token,
        "refresh_token": auth_response.session.refresh_token,
        "user": {
            "id": auth_response.user.id,
            "email": auth_response.user.email
        }
    }
