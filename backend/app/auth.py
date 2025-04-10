from fastapi import APIRouter, HTTPException
from app.supabase_client import supabase

router = APIRouter()

@router.post("/register")
def register(email: str, password: str):
    result = supabase.auth.sign_up({"email": email, "password": password})
    if result.user is None:
        raise HTTPException(status_code=400, detail=str(result))

    user_id = result.user.id
    # Insert or update role in your `users` table
    supabase.table("users").insert({
        "id": user_id,
        "email": email,
        "role": "volunteer"  # default role
    }).execute()

    return {"msg": "User registered", "user": result.user.email}


@router.post("/login")
def login(email: str, password: str):
    result = supabase.auth.sign_in_with_password({"email": email, "password": password})
    if result.session is None:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    return {
        "msg": "Logged in",
        "access_token": result.session.access_token,
        "user": result.user.email,
    }
