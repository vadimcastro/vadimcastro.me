from typing import List
from pydantic_settings import BaseSettings
import logging

logger = logging.getLogger(__name__)

class Settings(BaseSettings):
    # Debug mode
    DEBUG: bool = True

    # Database
    DATABASE_URL: str = "postgresql://postgres:password@db:5432/vadimcastro"

    # MinIO Settings
    MINIO_ROOT_USER: str = "minioadmin"
    MINIO_ROOT_PASSWORD: str = "minioadmin"
    MINIO_URL: str = "localhost:9000"

    # Redis Settings
    REDIS_URL: str = "redis://redis:6379"

    # Security
    SECRET_KEY: str = "7aeab0e978e6b0624570ad36a78d2baf0ea59902111cb3becfa92d0a9732fe0b"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    # Admin settings
    ADMIN_EMAIL: str = "vadim@vadimcastro.pro"
    ADMIN_PASSWORD: str = "meowmeow"
    ADMIN_NAME: str = "Vadim Castro"

    # CORS Configuration
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:8000",
        "https://vadimcastro.pro"
    ]
    CORS_METHODS: List[str] = ["*"]
    CORS_HEADERS: List[str] = ["*"]
    CORS_CREDENTIALS: bool = True
    CORS_MAX_AGE: int = 600

    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()