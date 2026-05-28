#!/usr/bin/env python
import os
import sys
import django
from pathlib import Path

# Add the django_admin directory to the Python path
BASE_DIR = Path(__file__).resolve().parent / 'django_admin'
sys.path.insert(0, str(BASE_DIR))

# Set up Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'admin_dashboard.settings')
django.setup()

from admin_app.models import User, Resume
import uuid
from django.utils import timezone

def test_resume_save():
    try:
        print("Testing Resume model save in Django...")

        # First, check if there's a user to associate with
        users = User.objects.using('shared').all()
        if not users.exists():
            print("No users found. Creating a test user...")
            user = User(
                id=str(uuid.uuid4()),
                name="Test User",
                email="test@example.com",
                password_hash="hashed_password",
                plan="free",
                provider="local",
                created_at=timezone.now(),
                updated_at=timezone.now()
            )
            user.save(using='shared')
            print(f"Created test user: {user.id}")
        else:
            user = users.first()
            print(f"Using existing user: {user.id}")

        # Now create a resume
        print("Creating resume...")
        resume = Resume(
            id=str(uuid.uuid4()),
            user=user,
            title="Test Resume",
            template="modern",
            is_active=True,
            created_at=timezone.now(),
            updated_at=timezone.now()
        )

        print(f"Resume ID: {resume.id}")
        print(f"Resume Title: {resume.title}")
        print(f"Resume User: {resume.user.name}")

        # Try to save
        resume.save(using='shared')
        print("✅ Resume saved successfully!")

        # Verify it was saved
        saved_resume = Resume.objects.using('shared').get(id=resume.id)
        print(f"✅ Resume verified in database: {saved_resume.title}")

        return True

    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    success = test_resume_save()
    sys.exit(0 if success else 1)
