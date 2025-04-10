from sqlalchemy import Column, String, Enum, TIMESTAMP
from sqlalchemy.dialects.postgresql import UUID
from enum import Enum as PyEnum
import uuid
from .database import Base

# Define enumeration for user roles
class Role(PyEnum):
    volunteer = 'volunteer'
    admin = 'admin'
    super_admin = 'super_admin'


class User(Base):
    __tablename__ = 'users'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(Enum(Role), default=Role.volunteer)
    created_at = Column(TIMESTAMP)