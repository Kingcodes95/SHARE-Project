from pydantic import BaseModel

class UserSignup(BaseModel):
    email: str           # For auth purposes
    username: str        # For login/display purposes
    password: str
    role: str = "volunteer"  # Default user role

class UserLogin(BaseModel):
    username: str        # Login using username
    password: str
