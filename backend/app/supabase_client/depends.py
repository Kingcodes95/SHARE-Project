from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from .supabase_client import supabase

auth_bearer = HTTPBearer()

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(auth_bearer)):
    access_token = credentials.credentials
    supabase.auth.set_session(access_token, '')
    user_response = supabase.auth.get_user()

    if not user_response or not user_response.user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Invalid or expired token')

    return user_response.user

def role_required(*allowed_roles):
    async def role_checker(user=Depends(get_current_user)):
        user_email = user.email
        result = supabase.table("Share-Users").select("role").eq("email", user_email).single().execute()
        if not result.data or result.data["role"] not in allowed_roles:
            raise HTTPException(status_code=403, detail="Insufficient access")
        return user
    return role_checker

# from fastapi import Depends, HTTPException, status
# from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
# from .supabase_client import supabase

# auth_bearer = HTTPBearer()

# async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(auth_bearer)):
#     access_token = credentials.credentials
    
#     try:
#         supabase.auth.set_session(access_token, "")
#         session_info = supabase.auth.get_user()
#     except Exception:
#         raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token verification failed")
    
#     return session_info

# def role_required(*allowed_roles):
#     async def role_checker(user=Depends(get_current_user)):
#         username = user
#         if not username:
#             raise HTTPException(status_code=403, detail="Username not found")

#         result = supabase.table("Share-Users").select("role").eq("username", username).single().execute()

#         if not result.data or result.data["role"] not in allowed_roles:
#             raise HTTPException(status_code=403, detail="Insufficient access")

#         return user
#     return role_checker


