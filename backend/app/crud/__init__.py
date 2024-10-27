# app/crud/__init__.py
from .crud_user import CRUDUser, crud_user

# Make sure crud_user is available at the package level
__all__ = ["crud_user"]