# Login 400 Error - Root Cause Analysis & Solution

## Problem Summary
The Next.js client was getting a **400 Bad Request** error when attempting to log in at `POST http://127.0.0.1:8000/api/auth/login/`.

## Root Cause Identified
**There were NO users in the database.** The Django server was correctly rejecting login attempts because:
1. No user accounts existed to authenticate against
2. The server returns: `{"non_field_errors":["Unable to log in with provided credentials."]}`
3. The serializer correctly validates that email + password combination doesn't exist

## Investigation Process

### 1. API Request Format (✓ Verified Correct)
**Client sends:**
```json
{
  "email": "test@example.com",
  "password": "TestPassword123!"
}
```

**Server expects (serializers.py - UserLoginSerializer):**
```python
class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()
```

### 2. Server Configuration (✓ Verified Correct)
- **Endpoint**: `/api/auth/login/` (maps to LoginView in auth_views.py)
- **View**: `LoginView` class uses `UserLoginSerializer`
- **Authentication**: `AllowAny` permission (no token required for login)
- **CORS**: Configured for `localhost:3000`
- **CSRF**: Configured with proper trusted origins

### 3. Database State (✗ Issue Found)
Before fix: **0 users** in the User model
- No test accounts existed
- Therefore, any login attempt would fail with "Unable to log in with provided credentials"

## Solution Implemented

### Fixed Server Settings.py
- **Issue**: Unicode emoji characters in print statements causing UnicodeEncodeError
- **Files affected**: `server\server\settings.py` lines 522, 540, 542, 518, 561
- **Fix**: Replaced emojis with ASCII equivalents (✓, ⚠️ → [OK], [!], etc.)
- **Result**: Django management commands now work properly

### Created Test Users
Created two test users in the database for testing:

**Client User:**
```
Email: test@example.com
Password: TestPassword123!
Role: client
```

**Admin User:**
```
Email: admin@example.com
Password: AdminPassword123!
Role: admin
```

Both users verified with Django's authenticate() function and confirmed working.

## Testing Steps

### 1. Start the Django Server
```bash
cd C:\Users\User\Documents\GitHub\Montrroase_website\server
python manage.py runserver 127.0.0.1:8000
```

### 2. Test Login Endpoint
Using curl:
```bash
curl -X POST http://127.0.0.1:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "TestPassword123!"}'
```

**Expected response (200 OK):**
```json
{
  "user": {
    "id": 1,
    "username": "test@example.com",
    "email": "test@example.com",
    "first_name": "Test",
    "last_name": "User",
    "role": "client",
    "company": null,
    "avatar": null,
    "bio": null
  },
  "token": "abcdef1234567890token..."
}
```

### 3. Test in Next.js Application
1. Navigate to `http://localhost:3000/auth/login`
2. Enter credentials:
   - Email: `test@example.com`
   - Password: `TestPassword123!`
3. Should redirect to `/dashboard` on success
4. Dashboard should display client-specific content

## Files Modified
- `C:\Users\User\Documents\GitHub\Montrroase_website\server\server\settings.py`
  - Lines 522, 540, 542, 518, 561: Replaced emoji characters with ASCII text

## Database Migrations Applied
- Created test user: `test@example.com` (role: client)
- Created test user: `admin@example.com` (role: admin)

## Next Steps
1. Start Django development server: `python manage.py runserver`
2. Test the login endpoint with the provided credentials
3. Proceed with Next.js dashboard testing
4. If new test users are needed, repeat the Python script to add them

## Notes
- The code was working correctly - it was just missing test data
- No changes to API service, authentication logic, or serializers were needed
- This is a database initialization issue, not a code issue
- Test credentials can be changed/added as needed using Django management

---

**Status**: ✓ ROOT CAUSE IDENTIFIED AND FIXED
**Date**: 2025-11-06
