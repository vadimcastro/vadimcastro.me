# app/api/v1/endpoints/notes.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.utils import get_db
from app.core.security import get_user_from_token
from fastapi.security import OAuth2PasswordBearer
from app.models.note import Note
from app.schemas.note import NoteCreate, Note as NoteSchema

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")

@router.post("/", response_model=NoteSchema)
async def create_note(
    note_in: NoteCreate,
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    user = get_user_from_token(token, db)
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
        
    note = Note(user_id=user.id, content=note_in.content)
    db.add(note)
    db.commit()
    db.refresh(note)
    return note

@router.get("/latest", response_model=NoteSchema)
async def get_latest_note(
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    user = get_user_from_token(token, db)
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
        
    note = db.query(Note).filter(
        Note.user_id == user.id
    ).order_by(Note.created_at.desc()).first()
    
    if not note:
        note = Note(user_id=user.id, content="")
        db.add(note)
        db.commit()
        db.refresh(note)
        
    return note