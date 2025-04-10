from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.supabase_client import supabase

router = APIRouter()

class RegisterRequest(BaseModel):
    username: str
    password: str

class LoginRequest(BaseModel):
    username: str
    password: str

@router.post("/register")
def register(data: RegisterRequest):
    username = data.username
    password = data.password
    fake_email = f"{username}@fake.com"

    result = supabase.auth.sign_up({
        "email": fake_email,
        "password": password
    })

    if result.user is None:
        raise HTTPException(status_code=400, detail="Signup failed")

    user_id = result.user.id

    supabase.table("users").insert({
        "id": user_id,
        "username": username,
        "user_role": "volunteer"
    }).execute()

    return {"message": "User registered", "username": username}

@router.post("/login")
def login(data: LoginRequest):
    username = data.username
    password = data.password
    fake_email = f"{username}@fake.com"

    result = supabase.auth.sign_in_with_password({
        "email": fake_email,
        "password": password
    })

    if result.session is None:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    user_id = result.user.id

    user_info = supabase.table("users").select("user_role").eq("id", user_id).single().execute()
    role = user_info.data.get("user_role", "volunteer")

    return {
        "message": "Login successful",
        "access_token": result.session.access_token,
        "user": username,
        "role": role
    }
