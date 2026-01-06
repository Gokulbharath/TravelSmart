# Troubleshooting 401 Unauthorized Error

## Understanding the Error

**401 Unauthorized** is returned by `POST /api/auth/login` when:
1. Email doesn't exist in database
2. Password doesn't match the stored hash

## Quick Checks

### 1. Verify User Exists in Database

**Option A: Using MongoDB Atlas UI**
- Log into MongoDB Atlas
- Go to your cluster → Browse Collections
- Check `users` collection
- Verify email exists

**Option B: Using MongoDB Shell**
```bash
# Connect to your database
mongosh "your-mongodb-connection-string"

# Use your database
use test  # or your database name

# Check users
db.users.find().pretty()
```

**Option C: Test Registration First**
- Register a new user through the frontend
- Try logging in with those credentials

### 2. Verify Password is Correct

**Common Issues:**
- Typo in password
- Extra spaces (leading/trailing)
- Wrong email address
- Password was changed but you're using old password

### 3. Check Backend Logs

When you try to login, check your backend console:
- Should show: `POST /api/auth/login`
- If you see errors, they'll be logged there

### 4. Test with Postman/Thunder Client

Test the API directly:

```http
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "yourpassword"
}
```

**Expected Responses:**

✅ **Success (200):**
```json
{
  "success": true,
  "user": {
    "id": "...",
    "name": "...",
    "email": "..."
  }
}
```

❌ **Invalid Credentials (401):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

### 5. Verify Password Hashing

If user exists but password doesn't work:

**Check if password was hashed:**
```javascript
// In MongoDB shell
db.users.findOne({ email: "your@email.com" })
// Password should be a long hash like: $2b$10$...
// NOT plain text!
```

**If password is NOT hashed:**
- User might have been created before password hashing was implemented
- Delete the user and register again

### 6. Frontend Debugging

Open browser console (F12) and check:

**Network Tab:**
- Look for `/api/auth/login` request
- Check Request Payload: `{ "email": "...", "password": "..." }`
- Check Response: Should show the error message

**Console Tab:**
- Look for any JavaScript errors
- Check if API call is being made

## Solutions

### Solution 1: Re-register User

If you're unsure about credentials:

1. **Register a new user:**
   ```http
   POST http://localhost:5000/api/auth/register
   {
     "name": "Test User",
     "email": "test@example.com",
     "password": "password123"
   }
   ```

2. **Login with new credentials**

### Solution 2: Reset User Password (Manual)

If you need to reset an existing user's password:

**Using MongoDB Shell:**
```javascript
// Connect to database
use test

// You'll need to hash the password manually or use bcrypt
// Better: Delete and re-register via API
db.users.deleteOne({ email: "test@example.com" })
```

Then register again via the API.

### Solution 3: Check Email Format

The backend validates email format. Ensure:
- Email contains `@` and `.`
- No extra spaces
- Lowercase (backend converts to lowercase automatically)

## Common Scenarios

### Scenario 1: "I just registered but can't login"
- **Check:** Wait a moment for database write to complete
- **Check:** Ensure registration returned `success: true`
- **Check:** Use exact same email/password from registration

### Scenario 2: "It worked before but now returns 401"
- **Check:** Did you change the password?
- **Check:** Is the user still in the database?
- **Check:** Was the database reset/cleared?

### Scenario 3: "401 on all login attempts"
- **Check:** Backend server is running
- **Check:** MongoDB connection is working
- **Check:** Database has users in it
- **Check:** Try registering first, then login

## Testing Checklist

- [ ] Backend server is running on port 5000
- [ ] MongoDB connection is established
- [ ] User exists in database
- [ ] Email is correct (case-insensitive, but check for typos)
- [ ] Password is correct (exact match, no extra spaces)
- [ ] Password is hashed in database (not plain text)
- [ ] Frontend is calling correct endpoint: `/api/auth/login`
- [ ] Request body contains `email` and `password`
- [ ] CORS is configured correctly (should be fixed now)

## Still Having Issues?

1. **Check backend logs** - Look for errors or warnings
2. **Test with Postman** - Bypass frontend to isolate issue
3. **Verify database connection** - Ensure MongoDB is accessible
4. **Clear localStorage** - Sometimes cached data causes issues:
   ```javascript
   // In browser console
   localStorage.clear()
   ```

## Expected Behavior

**Correct Flow:**
1. User enters email + password
2. Frontend sends: `POST /api/auth/login { email, password }`
3. Backend finds user by email
4. Backend compares password using `bcrypt.compare()`
5. If match: Returns `200` with user data
6. If no match: Returns `401` with "Invalid credentials"

