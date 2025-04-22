from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.supabase_client.supabase_client import router as auth_router
from app.supabase_client.secured import router as secured_router
import os
import uvicorn

app = FastAPI()
app.include_router(auth_router, prefix='/auth')
app.include_router(secured_router, prefix='/secured-route')

origins = [
    "http://localhost:3000"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Test route
@app.get("/")
def read_root():
    return {"message": "Hello, world!"}



if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)