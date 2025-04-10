from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.auth import router as auth_router

app = FastAPI()

# CORS configuration
origins = [
    "http://localhost:5173",  # Vite
    "http://127.0.0.1:5173",  # Some setups use 127.0.0.1
    "http://localhost:3000",  # Optional for other dev servers
    "http://127.0.0.1:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,       # Restricts to listed origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Auth routes
app.include_router(auth_router, prefix="/auth")

@app.get("/")
def read_root():
    return {"message": "Hello, world!"}
