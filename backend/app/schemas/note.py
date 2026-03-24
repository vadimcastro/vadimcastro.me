# app/schemas/note.py
from pydantic import BaseModel, ConfigDict
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

    model_config = ConfigDict(from_attributes=True)