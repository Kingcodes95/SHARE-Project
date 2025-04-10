from pydantic import BaseModel
from enum import Enum

class RoleEnum(str, Enum):
    volunteer = 'volunteer'
    admin = 'admin'
    super_admin = 'super_admin'

class UserCreate(BaseModel):
    username: str
    password: str
    role: RoleEnum = RoleEnum.volunteer

class Token(BaseModel):
    access_token: str
    token_type: str