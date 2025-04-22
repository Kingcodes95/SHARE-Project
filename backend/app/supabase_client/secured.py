from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from .supabase_client import supabase
from pydantic import BaseModel

auth_bearer = HTTPBearer()
router = APIRouter()

@router.get('/data', status_code=status.HTTP_200_OK)
async def get_secured_data(
    credentials: HTTPAuthorizationCredentials = Depends(auth_bearer)
):
    access_token = credentials.credentials
    supabase.auth.set_session(access_token, '')
    user_response = supabase.auth.get_user()

    try:
        user_response
    except Exception:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Invalid or expired token')
    
    user = user_response.user

    return {
        'message': 'Successful Access',
        'user_id': user.id,
        'username': user.user_metadata.get('username'),
        'role': user.user_metadata.get('role')
    }