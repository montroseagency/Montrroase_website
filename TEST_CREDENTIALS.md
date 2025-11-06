# Test Credentials for Development

## Available Test Users

### Client User
- **Email**: `test@example.com`
- **Password**: `TestPassword123!`
- **Role**: Client
- **Use for**: Testing client dashboard, client-side features

### Admin User
- **Email**: `admin@example.com`
- **Password**: `AdminPassword123!`
- **Role**: Admin
- **Use for**: Testing admin dashboard, admin-only features

## Quick Start

### 1. Start Backend Server
```bash
cd C:\Users\User\Documents\GitHub\Montrroase_website\server
python manage.py runserver 127.0.0.1:8000
```

### 2. Start Frontend Server (in another terminal)
```bash
cd C:\Users\User\Documents\GitHub\Montrroase_website\client
npm run dev
```

### 3. Login
- Navigate to: `http://localhost:3000/auth/login`
- Enter any test credentials above
- Should be redirected to the appropriate dashboard

## Creating Additional Test Users

Run this Python script in the server directory:

```bash
python -c "
import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings')
django.setup()

from api.models import User

# Create new test user
user = User.objects.create_user(
    email='your-email@example.com',
    username='your-email@example.com',
    password='YourPassword123!',
    first_name='Your',
    last_name='Name',
    role='client'  # or 'admin'
)
print(f'Created user: {user.email}')
"
```

## Testing API Endpoints Directly

### Test Login
```bash
curl -X POST http://127.0.0.1:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "TestPassword123!"}'
```

### Test with Token (after login)
```bash
curl -X GET http://127.0.0.1:8000/api/user/ \
  -H "Authorization: Token YOUR_TOKEN_HERE"
```

## Troubleshooting

### "Unable to log in with provided credentials"
- Check that the email/password combination is correct
- Verify the user exists: Run the user creation script above
- Verify the server is running

### CORS errors
- Ensure Django server is running on `127.0.0.1:8000`
- Ensure Next.js app is on `localhost:3000`
- Check `CORS_ALLOWED_ORIGINS` in `server/settings.py`

### "Database file is locked"
- Close all Python/Django processes
- Try again with fresh terminal

---

Last Updated: 2025-11-06
