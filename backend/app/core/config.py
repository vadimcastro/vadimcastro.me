# app/core/config.py
from pydantic_settings import BaseSettings
from typing import List
from functools import lru_cache
import secrets
import os
from .parameters import parameter_store

class Settings(BaseSettings):
    PROJECT_NAME: str = "Vadim Castro API"
    DEBUG: bool = True
    
    # Database settings
    POSTGRES_USER: str = "postgres"
    POSTGRES_PASSWORD: str = "password"
    POSTGRES_DB: str = "vadimcastro"
    POSTGRES_HOST: str = "db"
    POSTGRES_PORT: int = 5432
    
    @property
    def DATABASE_URL(self) -> str:
        # Try Parameter Store first, fallback to constructed URL
        if os.getenv('ENVIRONMENT') == 'production':
            return parameter_store.get_database_url()
        return f"postgresql://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.POSTGRES_HOST}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"
    
    # Admin user settings
    ADMIN_EMAIL: str = "vadim@vadimcastro.pro"
    ADMIN_PASSWORD: str = "meow"  # Now correctly using your password
    ADMIN_USERNAME: str = "vadimcastro"
    ADMIN_NAME: str = "Vadim Castro"
    
    # Redis settings
    @property
    def REDIS_URL(self) -> str:
        if os.getenv('ENVIRONMENT') == 'production':
            return parameter_store.get_redis_url()
        return "redis://redis:6379/0"
    
    # JWT Settings
    @property
    def SECRET_KEY(self) -> str:
        if os.getenv('ENVIRONMENT') == 'production':
            return parameter_store.get_secret_key()
        return secrets.token_urlsafe(32)
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # CORS Settings
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://frontend:3000",
        "http://0.0.0.0:3000",
        "http://localhost:8000",
        "http://127.0.0.1:8000",
        "http://0.0.0.0:8000",
        "http://api:8000",
    ]
    CORS_CREDENTIALS: bool = True
    CORS_METHODS: List[str] = ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"]
    CORS_HEADERS: List[str] = [
        "Content-Type",
        "Authorization",
        "Accept",
        "Origin",
        "X-Requested-With",
    ]
    CORS_MAX_AGE: int = 3600

    class Config:
        case_sensitive = True
        env_file = ".env"
        extra = "allow"

settings = Settings()