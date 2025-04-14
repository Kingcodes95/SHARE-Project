from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.auth.routes import router as auth_router
from app.auth.sessions import router as sessions_router  # Import the auth router
import os
import uvicorn

app = FastAPI()

# Define allowed origins
origins = ["*"]

# Configure CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this list or keep "*" if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root endpoint
@app.get("/")
def read_root():
    return {"message": "Hello, world!"}


app.include_router(auth_router)
app.include_router(sessions_router)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
