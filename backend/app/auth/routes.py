from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.database import supabase
from app.models import UserSignup, UserLogin
from app.auth.jwt_utils import verify_jwt

router = APIRouter()
auth_scheme = HTTPBearer()

@router.post("/signup")
async def signup(user: UserSignup):
    """
    Registers a new helper with email, username, password, and role.
    Assumes email confirmation is disabled on your Supabase project.
    Inserts a record into the Helpers table after the auth user is created.
    """
    # Correctly combine the payload into one dictionary:
    response = supabase.auth.sign_up({
        "email": user.email,
        "password": user.password,
        "data": {
            "username": user.username,
            "role": user.role
        }
    })

    if response.get("error"):
        raise HTTPException(
            status_code=400,
            detail=response.get("error").get("message")
        )

    # Optionally insert the helper details into your Helpers table:
    helper_response = supabase.table("Helpers").insert({
        "email": user.email,
        "username": user.username,
        "role": user.role
    }).execute()

    if helper_response.get("error"):
        raise HTTPException(
            status_code=400,
            detail=helper_response.get("error").get("message")
        )

    return {"message": "Helper signed up successfully.", "data": response.get("data")}


@router.post("/login")
async def login(user: UserLogin):
    """
    Logs in a helper using username and password.
    Looks up the corresponding email for the given username from the Helpers table,
    then calls Supabase's sign_in with that email.
    """
    # Look up the email for the provided username.
    profile_response = supabase.table("Helpers").select("email").eq("username", user.username).execute()
    if profile_response.get("error") or not profile_response.data:
        raise HTTPException(status_code=400, detail="Invalid username or password")

    email = profile_response.data[0]["email"]

    response = supabase.auth.sign_in({
        "email": email,
        "password": user.password
    })

    if response.get("error"):
        raise HTTPException(
            status_code=400,
            detail=response.get("error").get("message")
        )

    return {"message": "Logged in successfully.", "data": response.get("data")}


@router.get("/protected")
async def protected_route(credentials: HTTPAuthorizationCredentials = Depends(auth_scheme)):
    """
    A protected endpoint that verifies the JWT token and returns the user's role.
    """
    token = credentials.credentials
    payload = verify_jwt(token)
    user_role = payload.get("user_metadata", {}).get("role") or \
                payload.get("app_metadata", {}).get("role", "volunteer")
    return {"message": "Access granted", "user_role": user_role}
