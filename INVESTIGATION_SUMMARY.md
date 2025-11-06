# Investigation Summary: Login 400 Error

## Timeline of Discovery

### Initial Symptom
```
Browser Console Error:
POST http://127.0.0.1:8000/api/auth/login/ 400 (Bad Request)

Server Response:
{"non_field_errors":["Unable to log in with provided credentials."]}
```

### Investigation Steps

#### Step 1: Verified API Request Format
- ✓ Client sending: `{email: "test@example.com", password: "TestPassword123!"}`
- ✓ Format is correct JSON
- ✓ Content-Type header set to "application/json"
- ✓ Request method: POST

#### Step 2: Verified Server Configuration
- ✓ `LoginView` exists in `auth_views.py` line 249
- ✓ Uses `UserLoginSerializer` which expects email and password
- ✓ URL mapping is correct: `/api/auth/login/` → `LoginView`
- ✓ CORS configuration includes `localhost:3000`
- ✓ CSRF settings properly configured
- ✓ Permission class: `AllowAny` (correct for login endpoint)

#### Step 3: Tested Server Settings.py
- ✗ **FOUND ISSUE**: Unicode emoji characters in settings.py
  - Causes: `UnicodeEncodeError: 'charmap' codec can't encode character`
  - Prevents Django management commands from running
  - **FIXED**: Replaced all emoji with ASCII text

#### Step 4: Checked Database
- ✗ **FOUND ROOT CAUSE**: Database is completely empty
  - Query: `User.objects.all().count()` returned `0`
  - No test accounts exist
  - No production accounts exist
  - Any login attempt would fail because no users to authenticate

### Root Cause Analysis

```
Client Login Request
    ↓
Django serializer receives: {email: "test@example.com", password: "TestPassword123!"}
    ↓
UserLoginSerializer calls: authenticate(username="test@example.com", password="TestPassword123!")
    ↓
Django Auth Backend searches database for user with username="test@example.com"
    ↓
USER NOT FOUND (database is empty)
    ↓
Returns None
    ↓
Serializer validation fails with: "Unable to log in with provided credentials."
    ↓
LoginView returns: 400 Bad Request
    ↓
Browser shows error in console
```

## Solution Applied

### Part 1: Fix Django Settings
Replaced emoji characters in `server/settings.py`:
- Line 522: `✅` → `[OK]`
- Line 540: `🔧` → `[*]`
- Line 542: `⚠️` → `[!]`
- Line 518: `⚠️` → `[!]`
- Line 561: `⚠️` → `[!]`

**Why?** Windows PowerShell console uses CP1252 encoding which doesn't support emoji. This was preventing Django management commands from executing.

### Part 2: Create Test Users
```python
# Created in database:
User(
    email='test@example.com',
    username='test@example.com',
    password='TestPassword123!',  # hashed by Django
    first_name='Test',
    last_name='User',
    role='client'
)

User(
    email='admin@example.com',
    username='admin@example.com',
    password='AdminPassword123!',  # hashed by Django
    first_name='Admin',
    last_name='User',
    role='admin'
)
```

**Verification:**
```python
from django.contrib.auth import authenticate
user = authenticate(username='test@example.com', password='TestPassword123!')
# Returns: <User object> ✓ (not None)
```

## What Was NOT the Problem

- ❌ API Service code (client/lib/api.ts) was correct
- ❌ AuthForm component code was correct
- ❌ Server authentication logic was correct
- ❌ Serializers were correct
- ❌ URL routing was correct
- ❌ CORS configuration was correct
- ❌ Request/response format was correct

## What WAS the Problem

- ✓ **No users in database** - primary issue
- ✓ **Emoji in Django settings** - secondary issue preventing management commands

## How to Verify the Fix

### Quick Test with curl:
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
    "email": "test@example.com",
    "first_name": "Test",
    "last_name": "User",
    "role": "client",
    ...
  },
  "token": "abc123def456..."
}
```

### Test in Browser:
1. Start Django: `python manage.py runserver 127.0.0.1:8000`
2. Start Next.js: `npm run dev` (in client folder)
3. Go to: `http://localhost:3000/auth/login`
4. Enter:
   - Email: `test@example.com`
   - Password: `TestPassword123!`
5. Should redirect to `/dashboard`

## Key Learnings

1. **Error Messages are Helpful**: "Unable to log in with provided credentials" was the actual problem - no credentials existed to match!

2. **Database State Matters**: Even perfect code can't work without data to operate on

3. **Testing Data is Essential**: Development environments need test accounts for developers to test with

4. **Unicode in Configuration**: Be careful with emoji in config files when running on Windows with non-UTF8 console

## Prevention for Future

1. Add test data initialization script that runs on first setup
2. Document required test accounts in README
3. Add database seed/fixture file for development
4. Add checks in settings.py to warn if no users exist in development

---

**Investigation Complete**: 2025-11-06
**Status**: ✓ Fixed and Verified
