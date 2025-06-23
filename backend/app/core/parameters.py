# app/core/parameters.py
import os
from functools import lru_cache
from typing import Optional

class ParameterStore:
    def __init__(self):
        # Auto-detect AWS region or default to us-east-2
        self.region = os.getenv('AWS_DEFAULT_REGION', 'us-east-2')
        self.ssm = None
        
    def _init_boto3(self):
        """Lazy initialization of boto3 client"""
        if self.ssm is None:
            try:
                import boto3
                self.ssm = boto3.client('ssm', region_name=self.region)
            except Exception as e:
                print(f"Failed to initialize boto3: {e}")
                self.ssm = False
    
    @lru_cache(maxsize=128)
    def get_parameter(self, name: str, decrypt: bool = True) -> Optional[str]:
        """Get parameter from AWS Parameter Store with caching"""
        self._init_boto3()
        
        if self.ssm is False:
            return None
            
        try:
            response = self.ssm.get_parameter(
                Name=name,
                WithDecryption=decrypt
            )
            return response['Parameter']['Value']
        except Exception as e:
            print(f"Failed to get parameter {name}: {e}")
            return None
    
    def get_database_url(self) -> str:
        """Construct database URL from parameters"""
        host = self.get_parameter('/vadimcastro/database/host', decrypt=False)
        password = self.get_parameter('/vadimcastro/database/password')
        
        if not host or not password:
            # Fallback to environment variables
            return os.getenv('DATABASE_URL', '')
            
        return f"postgresql://postgres:{password}@{host}:5432/postgres"
    
    def get_redis_url(self) -> str:
        """Construct Redis URL from parameters"""
        host = self.get_parameter('/vadimcastro/redis/host', decrypt=False)
        
        if not host:
            # Fallback to environment variables
            return os.getenv('REDIS_URL', 'redis://localhost:6379/0')
            
        return f"redis://{host}:6379/0"
    
    def get_secret_key(self) -> str:
        """Get secret key from parameters"""
        secret = self.get_parameter('/vadimcastro/app/secret-key')
        
        if not secret:
            # Fallback to environment variables
            return os.getenv('SECRET_KEY', 'fallback-secret-key')
            
        return secret

# Global instance
parameter_store = ParameterStore()