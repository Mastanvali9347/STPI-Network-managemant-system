# Authentication API — Sample Tests

Base URL: `http://localhost:5000/api`

> Run `npm run seed` in `server/` before testing login.

## 1. Health check

```bash
curl http://localhost:5000/api/health
```

## 2. Register admin (optional)

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Test Admin\",\"email\":\"test@stpi.com\",\"password\":\"TestPass123\"}"
```

## 3. Login (demo credentials)

**PowerShell:**

```powershell
$body = @{ email = "admin@stpi.com"; password = "Admin123" } | ConvertTo-Json
$response = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method POST -ContentType "application/json" -Body $body
$response
$token = $response.token
```

**curl:**

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"admin@stpi.com\",\"password\":\"Admin123\"}"
```

## 4. Get profile (protected)

```bash
curl http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**PowerShell:**

```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/auth/profile" -Headers @{ Authorization = "Bearer $token" }
```

## 5. Protected network route

```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/network/dashboard" -Headers @{ Authorization = "Bearer $token" }
```

## Expected login response

```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "...",
    "name": "STPI Administrator",
    "email": "admin@stpi.com",
    "role": "admin",
    "createdAt": "..."
  }
}
```

## Demo credentials

| Field | Value |
|-------|--------|
| Email | `admin@stpi.com` |
| Password | `Admin123` |

Passwords are **never** returned by the API. Only bcrypt hashes are stored in MongoDB.
