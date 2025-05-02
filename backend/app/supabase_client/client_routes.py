from .supabase_client import supabase
from fastapi import APIRouter, HTTPException, status, Depends, Body
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

@router.patch("/{client_id}")
def update_client(client_id: int, updates: dict = Body(...)):
    try:
        # print("Updating client_id:", client_id)
        # print("Update payload:", updates)

        response = (
            supabase.table("Share-Clients")
            .update(updates)
            .eq("id", int(client_id))
            .execute()
        )

        # print("Supabase response:", response)

        if response.data:
            return response.data[0]
        else:
            raise HTTPException(status_code=404, detail="Client not found")

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

