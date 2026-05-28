# TODO: Fix Django Admin Saving for PersonalInfo, User, and UserActivity

## Current Work
- Fixed PersonalInfo saving by adding custom save() method for id generation and timestamps.
- Fixed User saving by adding custom save() method for id generation and timestamps.
- Now fixing UserActivity saving in Django admin, as adding new activities also fails due to missing created_at in unmanaged model.

## Key Technical Concepts
- Django models with managed=False (unmanaged SQLite tables from Node.js).
- Custom save() method using django.utils.timezone for timestamps (no id for UserActivity as it's AutoField).
- No changes to database schema, Node.js code, or other models/admin registrations.

## Relevant Files and Code
- django_admin/admin_app/models.py
  - UserActivity model: Add save() method to set created_at if missing.
  - Current code: UserActivity has AutoField id (PK), DateTimeField created_at (no auto_now), required ForeignKey to User.

## Problem Solving
- Issue: Unmanaged UserActivity model lacks timestamp default in Django context, causing validation errors on save for new activities.
- Solution: Custom save() sets created_at before super().save().

## Pending Tasks and Next Steps
- [x] Edit django_admin/admin_app/models.py: Added save() to PersonalInfo.
- [x] Edit django_admin/admin_app/models.py: Added save() to User.
- [ ] Edit django_admin/admin_app/models.py: Add save() method to UserActivity class.
  - "In UserActivity class, add: def save(self, *args, **kwargs): if not self.created_at: self.created_at = timezone.now(); super().save(*args, **kwargs)"
- [ ] Restart Django server: Run 'python manage.py runserver' in django_admin directory.
- [ ] Test PersonalInfo: Add new (select Resume, fill fields, Save) - verify saves; edit existing, Save and continue - verify update.
- [ ] Test User: Add new User (fill name, email, password_hash as hashed string, plan='free', provider='local', Save) - verify saves and lists; edit existing, change field, Save and continue - verify update.
- [ ] Test UserActivity: Add new (select User, optionally Session, fill activity_type/description, Save) - verify saves and lists; edit existing, change field, Save and continue - verify update.
- [ ] If errors, check Django console for tracebacks and adjust.

User confirmed plan to proceed for UserActivity fix.
