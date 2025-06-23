# app/schemas/note.py
from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class NoteBase(BaseModel):
    content: str
    title: Optional[str] = None

class NoteCreate(NoteBase):
    pass

class NoteUpdate(NoteBase):
    pass

class Note(NoteBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True