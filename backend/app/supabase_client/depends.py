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
        user_role = user.user_metadata.get('role')
        try:
            user_role
        except Exception:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='Insufficent access')
        return user
    return role_checker