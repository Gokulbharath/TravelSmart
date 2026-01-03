# Troubleshooting 500 Internal Server Error on Registration

## Most Common Causes

### 1. Missing .env File (MOST COMMON)
**Problem:** MongoDB connection string not configured

**Solution:**
1. Create `.env` file in `server/` directory
2. Add your MongoDB Atlas connection string:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/travelsmart?retryWrites=true&w=majority
PORT=5000
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

**How to check:**
- Look at server console - you should see "MongoDB Connected: ..." message
- If you see "MongoDB Connection Error" → .env file is missing or MONGODB_URI is wrong

---

### 2. MongoDB Connection Failed
**Problem:** MongoDB Atlas connection failing

**Check:**
1. Is MongoDB Atlas cluster running?
2. Is your IP whitelisted? (Network Access in MongoDB Atlas)
3. Is the connection string correct?
4. Did you replace `<password>` with actual password?

**Solution:**
- Go to MongoDB Atlas → Network Access
- Add IP Address: `0.0.0.0/0` (allow from anywhere) for development
- Verify connection string has correct password

---

### 3. Validation Error
**Problem:** User input doesn't meet schema requirements

**Common issues:**
- Password less than 6 characters
- Invalid email format
- Missing required fields

**Solution:**
- Check frontend sends: `name`, `email`, `password`
- Ensure password is at least 6 characters
- Verify email format is valid

---

### 4. Server Not Running
**Problem:** Backend server not started

**Solution:**
```bash
cd server
npm install  # if not done already
npm run dev  # or npm start
```

**Check:** Should see:
```
Server running on port 5000
MongoDB Connected: cluster0.xxxxx.mongodb.net
```

---

## Step-by-Step Debugging

### Step 1: Check Server Console
Look at your backend server terminal. You should see:
- `Server running on port 5000`
- `MongoDB Connected: [host]`

If you DON'T see "MongoDB Connected" → MongoDB connection failed

### Step 2: Check .env File
```bash
cd server
# Check if .env exists
```

If it doesn't exist, create it with your MongoDB connection string.

### Step 3: Test MongoDB Connection
Try registering again and check:
- Server console for error messages
- Browser console for the actual error response

### Step 4: Check Error Response
With the updated code, you should see a more detailed error message in the response.

Open browser DevTools → Network tab → Click on the failed request → Response tab

---

## Quick Fix Checklist

- [ ] `.env` file exists in `server/` directory
- [ ] `MONGODB_URI` is set in `.env`
- [ ] MongoDB Atlas cluster is running
- [ ] IP address is whitelisted in MongoDB Atlas
- [ ] Server shows "MongoDB Connected" message
- [ ] Backend server is running on port 5000
- [ ] Frontend can reach `http://localhost:5000/api`

---

## Test Registration Manually

Use curl or Postman to test:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@test.com","password":"password123"}'
```

Check the response for specific error message.

---

## Still Getting 500 Error?

1. Check server console logs - error details will be printed
2. Check browser Network tab → Response for error details
3. Verify MongoDB Atlas is accessible
4. Ensure all dependencies installed: `npm install` in server directory

---

## Updated Error Handling

The code has been updated to:
- Log detailed error messages to server console
- Return better error messages in response
- Handle validation errors properly
- Handle duplicate email errors

Try registering again and check the server console for the actual error message.

