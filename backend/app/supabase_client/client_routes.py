from .supabase_client import supabase
from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel

auth_bearer = HTTPBearer()
router = APIRouter()

@router.get('/', status_code=status.HTTP_200_OK)
async def get_clients(
    credentials: HTTPAuthorizationCredentials = Depends(auth_bearer)
):
    client_response = supabase.table('Share-Clients').select('*').execute()
    try:
        client_response
    except Exception:
        raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail='Error retrieving Clients')
    
    return client_response.data
