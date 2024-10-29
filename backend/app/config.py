# app/core/config.py
from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    PROJECT_NAME: str = "vadimcastro.me"
    API_V1_STR: str = "/api/v1"
    POSTGRES_SERVER: str = "localhost"
    POSTGRES_USER: str = "postgres"
    POSTGRES_PASSWORD: str = "password"
    POSTGRES_DB: str = "vadimcastro"
    CORS_ORIGINS: List[str] = [ "http://localhost:3000",
                                "http://localhost:8000",
                                "https://vadimcastro.pro" ]
    
    class Config:
        case_sensitive = True

settings = Settings()