# test_auth.py
import requests
import json
from typing import Optional

class AuthTester:
    def __init__(self, base_url: str = "http://localhost:8000"):
        self.base_url = base_url
        self.token: Optional[str] = None

    def create_user(self, email: str, password: str) -> bool:
        """Create a test user"""
        response = requests.post(
            f"{self.base_url}/api/v1/users/",
            json={
                "email": email,
                "password": password,
                "username": email.split("@")[0],
                "is_superuser": True
            }
        )
        return response.status_code == 200

    def login(self, email: str, password: str) -> bool:
        """Test login and token generation"""
        response = requests.post(
            f"{self.base_url}/api/v1/auth/login",
            data={
                "username": email,
                "password": password
            }
        )
        
        if response.status_code == 200:
            self.token = response.json()["access_token"]
            return True
        return False

    def test_me_endpoint(self) -> bool:
        """Test the /me endpoint with the token"""
        if not self.token:
            return False

        response = requests.get(
            f"{self.base_url}/api/v1/auth/me",
            headers={"Authorization": f"Bearer {self.token}"}
        )
        return response.status_code == 200

def main():
    # Initialize tester
    tester = AuthTester()
    
    # Test credentials
    email = "admin@example.com"
    password = "admin123"
    
    # Create user
    print("Creating user...")
    if tester.create_user(email, password):
        print("✓ User created successfully")
    else:
        print("✗ Failed to create user")
        return

    # Test login
    print("\nTesting login...")
    if tester.login(email, password):
        print("✓ Login successful")
        print(f"Token: {tester.token}")
    else:
        print("✗ Login failed")
        return

    # Test protected endpoint
    print("\nTesting protected endpoint...")
    if tester.test_me_endpoint():
        print("✓ Protected endpoint accessed successfully")
    else:
        print("✗ Failed to access protected endpoint")

if __name__ == "__main__":
    main()