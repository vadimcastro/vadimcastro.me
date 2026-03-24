# app/schemas/token.py
from pydantic import BaseModel, Field
from typing import Optional

class Token(BaseModel):
    access_token: str = Field(..., description="JWT access token")
    token_type: str = Field(..., description="Type of token (e.g. bearer)")
    refresh_token: Optional[str] = Field(None, description="Optional refresh token")

class TokenPayload(BaseModel):
    sub: Optional[str] = Field(None, description="Subject (usually user email or ID)")
    exp: Optional[int] = Field(None, description="Expiration timestamp")
    type: Optional[str] = Field(None, description="Token type label")