from fastapi import APIRouter, HTTPException
from app.database import supabase
from app.models import UserLogin
import bcrypt
import logging

router = APIRouter()
SESSION_TIMEOUT = 10 * 60 # 10 mins for now


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
    
    return {"message": "Logged in successfully"}
