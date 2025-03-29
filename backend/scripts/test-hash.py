
from app.core.hashing import verify_password, get_password_hash
from app.core.config import settings
import logging

logging.basicConfig(level=logging.INFO)

# Get settings values
print(f"ADMIN_PASSWORD from settings: {settings.ADMIN_PASSWORD}")

# Test hash generation
test_hash = get_password_hash("meow")
print(f"\nTest hash generated: {test_hash}")
print(f"Verify test hash works: {verify_password('meow', test_hash)}")

# Test with actual admin password
admin_hash = get_password_hash(settings.ADMIN_PASSWORD)
print(f"\nAdmin hash generated: {admin_hash}")
print(f"Verify admin hash works: {verify_password(settings.ADMIN_PASSWORD, admin_hash)}")

# Test against stored hash
stored_hash = "$2b$12$WLZyhNzvlR0Cj3.U4nLDUuYoH9p4KBU3w2pdK/lcx2QSrTlbPdj86"
print(f"\nTrying stored hash verification...")
print(f"Using password: {settings.ADMIN_PASSWORD}")
print(f"Against hash: {stored_hash}")
print(f"Verification result: {verify_password(settings.ADMIN_PASSWORD, stored_hash)}")