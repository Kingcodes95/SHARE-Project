from fastapi import APIRouter, HTTPException
from app.database import supabase
from app.models import UserLogin
import bcrypt
import logging

router = APIRouter()
SESSION_TIMEOUT = 10 * 60 # 10 mins for now


@router.post('/auth/login')
async def login(user: UserLogin):

    # looks up users profile in "users" table
    profile_response = supabase.table("users").select("email", "password").eq("username", user.username).execute()
    # if profile_response.error or not profile_response.data:
    #     raise HTTPException(status_code=400, detail="Invalid username or password")
    
    # Extracts the hashed password and email from first record
    stored_hashed_password = profile_response.data[0]["password"]
    email = profile_response.data[0]["email"]

    # uses bcrypt to compare the provided password
    if not bcrypt.checkpw(user.password.encode('utf-8'), stored_hashed_password.encode('utf-8')):
        raise HTTPException(status_code=400, detail="invalid username or password")
    
    # log the user in supabase auth
    auth_response = supabase.auth.sign_in_with_password({
        "email": email,
        "password": user.password
    })

    # if auth_response.error:
    #     raise HTTPException(status_code=400, detail=auth_response.error.message)
    
    return {"message": "Logged in successfully"}
