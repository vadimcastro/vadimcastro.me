# app/core/config.py
from typing import List
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # Database
    DATABASE_URL: str

    # MinIO Settings
    MINIO_ROOT_USER: str
    MINIO_ROOT_PASSWORD: str
    MINIO_URL: str

    # Redis Settings
    REDIS_URL: str

    # Security
    SECRET_KEY: str = "7aeab0e978e6b0624570ad36a78d2baf0ea59902111cb3becfa92d0a9732fe0b"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    # Admin settings
    ADMIN_EMAIL: str
    ADMIN_PASSWORD: str
    ADMIN_NAME: str

    # CORS Configuration
    CORS_ORIGINS: List[str] = [
        "http://localhost:8000",
        "http://localhost:3000",  # React development server
        "https://vadimcastro.pro"  # Production domain
    ]
    CORS_METHODS: List[str] = ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"]
    CORS_HEADERS: List[str] = [
        "Content-Type",
        "Authorization",
        "Accept",
        "Origin",
        "X-Requested-With",
    ]
    CORS_CREDENTIALS: bool = True
    CORS_MAX_AGE: int = 600  # 10 minutes

    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()