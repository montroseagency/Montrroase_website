# Quick Start Guide - After Login Fix

## Prerequisites
- Python 3.9+ installed
- Node.js 18+ installed
- Both projects cloned and dependencies installed

## Running the Application

### Terminal 1: Start Django Backend
```bash
cd C:\Users\User\Documents\GitHub\Montrroase_website\server
python manage.py runserver 127.0.0.1:8000
```

Expected output:
```
[*] Development mode: Using PayPal Sandbox
Starting development server at http://127.0.0.1:8000/
```

### Terminal 2: Start Next.js Frontend
```bash
cd C:\Users\User\Documents\GitHub\Montrroase_website\client
npm run dev
```

Expected output:
```
- ready started server on 0.0.0.0:3000
- event compiled client and server successfully
```

## Test Login

### Via Browser
1. Open: `http://localhost:3000/auth/login`
2. Select **Login** tab
3. Enter credentials:
   - **Email**: `test@example.com`
   - **Password**: `TestPassword123!`
4. Click **Sign In**
5. Should redirect to: `http://localhost:3000/dashboard`

### Via cURL
```bash
curl -X POST http://127.0.0.1:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "TestPassword123!"}'
```

Expected response:
```json
{
  "user": {
    "id": 1,
    "email": "test@example.com",
    "first_name": "Test",
    "last_name": "User",
    "role": "client",
    "company": null,
    "avatar": null,
    "bio": null
  },
  "token": "1234567890abcdef"
}
```

## Test Multiple Users

### Admin Login
- **Email**: `admin@example.com`
- **Password**: `AdminPassword123!`
- Should show admin dashboard after login

### Client Login
- **Email**: `test@example.com`
- **Password**: `TestPassword123!`
- Should show client dashboard after login

## Common Issues & Solutions

### Issue: "Unable to log in with provided credentials"
**Cause**: Django server not running or database not initialized
**Solution**:
1. Ensure Django server is running (see Terminal 1 above)
2. Wait 10 seconds for server to fully start
3. Try login again

### Issue: CORS error in browser console
**Cause**: Django server not running on expected URL
**Solution**:
1. Verify Django is running on `http://127.0.0.1:8000`
2. Check `NEXT_PUBLIC_API_URL` in `client/.env.local` matches

### Issue: "Connection refused" when accessing localhost:3000
**Cause**: Next.js server not running
**Solution**: Start Next.js (see Terminal 2 above)

### Issue: "Module not found" error
**Cause**: Dependencies not installed
**Solution**:
```bash
# For server
cd server
pip install -r requirements.txt

# For client
cd client
npm install
```

## Dashboard Navigation

### After Login as Client
- **Overview**: View your stats and upcoming payments
- **My Content**: Manage your content submissions
- **My Tasks**: View assigned tasks
- **Analytics**: Track your performance
- **Billing**: Manage subscriptions
- **Messages**: Contact support
- **Social Accounts**: Connect social media
- **Settings**: Account preferences

### After Login as Admin
- **Overview**: View business metrics
- **Clients**: Manage all clients
- **Content**: Review and approve content
- **Tasks**: Create and manage tasks
- **Invoices**: Track billing
- **Analytics**: View system analytics
- **Messages**: Client communications
- **Settings**: Admin configuration

## Create Additional Test Users

```bash
cd C:\Users\User\Documents\GitHub\Montrroase_website\server

python -c "
import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings')
django.setup()

from api.models import User

# Replace with your details
user = User.objects.create_user(
    email='newuser@example.com',
    username='newuser@example.com',
    password='NewPassword123!',
    first_name='New',
    last_name='User',
    role='client'  # or 'admin'
)
print(f'Created user: {user.email}')
"
```

## Database Operations

### View all users
```bash
python -c "
import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings')
django.setup()

from api.models import User
for user in User.objects.all():
    print(f'{user.email} - {user.role}')
"
```

### Reset password for a user
```bash
python -c "
import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings')
django.setup()

from api.models import User
user = User.objects.get(email='test@example.com')
user.set_password('NewPassword123!')
user.save()
print(f'Password updated for {user.email}')
"
```

## Testing API Endpoints

### Test with Authentication Token
```bash
# 1. Login to get token
TOKEN=$(curl -X POST http://127.0.0.1:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"TestPassword123!"}' \
  | grep -o '"token":"[^"]*' | cut -d'"' -f4)

# 2. Use token for authenticated request
curl -X GET http://127.0.0.1:8000/api/user/ \
  -H "Authorization: Token $TOKEN"
```

## Environment Configuration

### Client (.env.local)
```
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api
```

### Server (.env)
Already configured. Key variables:
- `DEBUG=True` (development)
- `ALLOWED_HOSTS=*` (development)
- `CORS_ALLOWED_ORIGINS=http://localhost:3000`

## Stopping Servers

Press `Ctrl+C` in each terminal:
```bash
# Terminal 1 (Django)
^C

# Terminal 2 (Next.js)
^C
```

## Next Steps

1. ✓ Servers running
2. ✓ Login working
3. Start testing dashboard features
4. Test API endpoints
5. Implement remaining dashboard pages (see DASHBOARD_COMPLETE.md)

---

**Setup Complete!** 🚀

For more details, see:
- `INVESTIGATION_SUMMARY.md` - Full root cause analysis
- `TEST_CREDENTIALS.md` - Available test accounts
- `LOGIN_DEBUG_REPORT.md` - Technical details
- `DASHBOARD_COMPLETE.md` - Dashboard implementation status
