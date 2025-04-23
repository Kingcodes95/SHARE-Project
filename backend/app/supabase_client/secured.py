from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from .depends import get_current_user, role_required
from pydantic import BaseModel

auth_bearer = HTTPBearer()
router = APIRouter()

@router.get('/data', status_code=status.HTTP_200_OK)
async def get_secured_data(
    user: HTTPAuthorizationCredentials = Depends(get_current_user)
):
    return {
        'message': 'Successful Access',
        'user_id': user.id,
        'username': user.user_metadata.get('username'),
        'role': user.user_metadata.get('role')
    }

@router.get('/dashboard', status_code=status.HTTP_200_OK)
async def get_admin_dashboard(user=Depends(role_required('admin', 'super_admin'))):
    return {
        'message': 'Admin Dashboard Access',
        'user_id': user.id,
        'username': user.user_metadata.get('username'),
        'role': user.user_metadata.get('role')
    }