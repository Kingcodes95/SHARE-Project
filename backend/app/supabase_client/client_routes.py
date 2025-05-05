from .supabase_client import supabase
from fastapi import APIRouter, HTTPException, status, Depends, Body
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from .depends import role_required, get_current_user


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


@router.post("/create_client")
def create_client(new_client: dict = Body(...)):
    try:
        print("Received client data:", new_client)
        response = (
            supabase.table('Share-Clients').insert(new_client).execute()
        )

        if response.data:
            return response.data[0]
        else:
            raise HTTPException(status_code=404, detail="Client not found")
    except Exception:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Could not create account")


@router.delete("/{client_id}")
def deleted_client(
    client_id: int,
    # user: dict = Depends(get_current_user)
):
    # print("User object from token/session:", user)
    # if user not in ['admin', 'super_admin']:
    #     raise HTTPException(status_code=403, detail="Not Authorized")
    
    try:
        supabase.table('Share-Clients').delete().eq('id', client_id).execute()
    except Exception:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Client not found')




# to delete a record
# supabase.table('Share-Users').delete().eq('id', 500).execute()


# new_row = {
#     'username': 'Volunteer1',
#     'hashed_password': 'password1',
#     'role': 'volunteer'
# }
# supabase.table('Share-Users').insert(new_row).execute()