# app/schemas/user.py
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr, ConfigDict, Field

# User schemas
class UserBase(BaseModel):
    email: EmailStr
    username: str
    name: Optional[str] = None
    role: Optional[str] = None
    is_active: bool = True
    is_superuser: bool = False

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    password: Optional[str] = Field(None, min_length=8)
    email: Optional[EmailStr] = Field(None)
    username: Optional[str] = Field(None)
    name: Optional[str] = Field(None)
    role: Optional[str] = Field(None)
    is_active: Optional[bool] = Field(None)
    is_superuser: Optional[bool] = Field(None)

class UserInDBBase(UserBase):
    model_config = ConfigDict(from_attributes=True)
    
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

class User(UserInDBBase):
    pass

class UserInDB(UserInDBBase):
    hashed_password: str