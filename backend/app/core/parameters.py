# app/core/parameters.py
import os
from functools import lru_cache
from typing import Optional

class ParameterStore:
    def __init__(self):
        self.region = os.getenv('AWS_DEFAULT_REGION', 'us-east-2')
        self.prefix = os.getenv('PARAMETER_STORE_PREFIX', '/vadimcastro').rstrip('/')
        self.ssm = None
        
    def _init_boto3(self):
        """Lazy initialization of boto3 client with Parameter Store credentials"""
        if self.ssm is None:
            try:
                import boto3
                session = boto3.Session()
                temp_ssm = session.client('ssm', region_name=self.region)
                
                try:
                    access_key = temp_ssm.get_parameter(
                        Name=f'{self.prefix}/aws/access-key-id',
                        WithDecryption=True
                    )['Parameter']['Value']
                    
                    secret_key = temp_ssm.get_parameter(
                        Name=f'{self.prefix}/aws/secret-access-key',
                        WithDecryption=True
                    )['Parameter']['Value']
                    
                    self.ssm = boto3.client(
                        'ssm',
                        region_name=self.region,
                        aws_access_key_id=access_key,
                        aws_secret_access_key=secret_key
                    )
                except Exception:
                    self.ssm = temp_ssm
                    
            except Exception:
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
        except Exception:
            return None
    
    def get_database_url(self) -> str:
        """Construct database URL from parameters"""
        host = self.get_parameter(f'{self.prefix}/database/host', decrypt=False)
        password = self.get_parameter(f'{self.prefix}/database/password')
        
        if not host or not password:
            return os.getenv('DATABASE_URL', '')
            
        return f"postgresql://postgres:{password}@{host}:5432/postgres"
    
    def get_redis_url(self) -> str:
        """Construct Redis URL from parameters"""
        host = self.get_parameter(f'{self.prefix}/redis/host', decrypt=False)
        
        if not host:
            return os.getenv('REDIS_URL', 'redis://localhost:6379/0')
            
        return f"redis://{host}:6379/0"
    
    def get_secret_key(self) -> str:
        """Get secret key from parameters"""
        secret = self.get_parameter(f'{self.prefix}/app/secret-key')
        
        if not secret:
            return os.getenv('SECRET_KEY', '')
            
        return secret

parameter_store = ParameterStore()