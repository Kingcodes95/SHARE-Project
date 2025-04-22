from supabase import create_client, Client
from supabase.lib.client_options import ClientOptions
from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from pydantic import BaseModel
from dotenv import load_dotenv
import bcrypt
import os

# Loads .env file
load_dotenv()

SUPABASE_URL= os.getenv('SUPABASE_URL') 
SUPABASE_KEY= os.getenv('SUPABASE_KEY')

# Initialize supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY, options=ClientOptions(auto_refresh_token=True, persist_session=True))

router = APIRouter(tags=["auth"])
auth_bearer = HTTPBearer()

# Pydantic model for signup
class SignupRequest(BaseModel):
    username: str
    password: str
    role: str

# Pydantic model for login
class LoginRequest(BaseModel):
    username: str
    password: str

class LogoutRequest(BaseModel):
    refresh_token: str

# Signup route
@router.post('/signup', status_code=status.HTTP_201_CREATED)
async def signup(User: SignupRequest):
    # Created fake email for auth
    email = f'{User.username}@no-email.local'

    # Sign up in supabase
    auth_res = supabase.auth.sign_up({
        "email": email,
        "password": User.password
    })

    hashed = bcrypt.hashpw(User.password.encode(), bcrypt.gensalt()).decode()

    profile = {
        'id': auth_res.user.id,
        'username': User.username,
        'hashed_password': hashed,
        'role': User.role
    }

    try:
        supabase.table("Share-Users").insert(profile).execute()
    except Exception:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Could not create account.")
    


    return {
        "message":       "Signup successful",
        "user_id":       auth_res.user.id,
        "access_token":  auth_res.session.access_token,
        "refresh_token": auth_res.session.refresh_token
    }

# Login function, returns access token and refresh token  
@router.post('/login', status_code=status.HTTP_200_OK)
async def login(User: LoginRequest):

    email = f'{User.username}@no-email.local'

    # profile_response = supabase.table('Share-Users').select('hashed_password').eq('username', User.username).single().execute()
    try:
        auth_response = supabase.auth.sign_in_with_password({
            "email": email,
            "password": User.password
        })
    except Exception:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Invalid username and password')
    

    profile_meta_data = supabase.table('Share-Users').select('username', 'role').eq('id', auth_response.user.id).single().execute()
    try:
        profile_meta_data
    except Exception:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail='Could not fetch user profile.')
    
    return{
        "message":       "Login successful",
        "user":          profile_meta_data.data,
        "access_token":  auth_response.session.access_token,
        "refresh_token": auth_response.session.refresh_token
    }

@router.post('/logout', status_code=status.HTTP_200_OK)
async def logout(
    body: LogoutRequest,
    credentials: HTTPAuthorizationCredentials = Depends(auth_bearer)
):
   
    access_token = credentials.credentials
    refresh_token = body.refresh_token

    try:
        supabase.auth.set_session(access_token, refresh_token)  
        supabase.auth.sign_out()
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Logout failed: {e}"
        )

    return {"message": "Logged out successfully"}




#insert new row onto Share-Users table
# new_row = {
#     'username': 'Volunteer1',
#     'hashed_password': 'password1',
#     'role': 'volunteer'
# }
# supabase.table('Share-Users').insert(new_row).execute()

# Update info
# new_row = {
#     'username': 'Cliff',
#     'role': 'admin'
# }
# supabase.table('Share-Users').update(new_row).eq('id', 2).execute()

# to delete a record
# supabase.table('Share-Users').delete().eq('id', 500).execute()

# results = supabase.table('Share-Users').select('*').execute()
# print(results)