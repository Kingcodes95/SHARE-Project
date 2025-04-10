from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.auth import router as auth_router

app = FastAPI()

# CORS settings for frontend (adjust origin in production)
origins = [
    "http://localhost:3000",  # frontend dev server
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,            # allows frontend to make requests
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Supabase-auth-based routes
app.include_router(auth_router, prefix="/auth")

@app.get("/")
def read_root():
    return {"message": "Server is up!"}
