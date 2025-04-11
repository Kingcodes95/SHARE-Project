# Initializes the Database so other parts of the app
# can simply import the client from this module

from supabase import create_client, Client
from .config import SUPABASE_URL, SUPABASE_ANON_KEY

supabase: Client = create_client(SUPABASE_URL, SUPABASE_ANON_KEY)