# TravelSmart Backend - Setup Checklist

Use this checklist to ensure everything is set up correctly.

## Pre-Setup

- [ ] Node.js installed (v14+)
- [ ] npm or yarn installed
- [ ] MongoDB Atlas account created
- [ ] MongoDB Atlas cluster created (free tier is fine)

## Installation

- [ ] Navigated to `server/` directory
- [ ] Ran `npm install` successfully
- [ ] All dependencies installed without errors

## Configuration

- [ ] Created `.env` file in `server/` directory
- [ ] Added MongoDB connection string to `.env`
- [ ] Set `PORT=5000` in `.env`
- [ ] Set `CLIENT_URL=http://localhost:5173` in `.env`
- [ ] Set `NODE_ENV=development` in `.env`
- [ ] MongoDB Atlas IP whitelist configured (0.0.0.0/0 for dev)

## Database Setup

- [ ] MongoDB Atlas cluster is running
- [ ] Database user created in MongoDB Atlas
- [ ] Network Access configured in MongoDB Atlas
- [ ] Connection string tested and valid

## Server Startup

- [ ] Ran `npm run dev` or `npm start`
- [ ] Server started on port 5000
- [ ] MongoDB connection successful
- [ ] No error messages in console

## API Testing

- [ ] Tested root endpoint: `GET http://localhost:5000/`
- [ ] Tested registration: `POST /api/auth/register`
- [ ] Tested login: `POST /api/auth/login`
- [ ] Tested get trips: `GET /api/trips/:userId`
- [ ] Tested create trip: `POST /api/trips`
- [ ] Tested delete trip: `DELETE /api/trips/trip/:id`

## Frontend Integration

- [ ] Installed axios in frontend: `npm install axios`
- [ ] Created `src/utils/api.js` with axios configuration
- [ ] Updated `mockAPI.js` with real API calls
- [ ] Updated `AuthContext.jsx` to use real API
- [ ] Updated `PlanTrip.jsx` to include userId
- [ ] Updated `Profile.jsx` to use real API
- [ ] Frontend successfully connects to backend

## Functionality Testing

- [ ] User can register new account
- [ ] User can login with registered credentials
- [ ] User can view their profile
- [ ] User can update their profile
- [ ] User can create a new trip
- [ ] User can view all their trips
- [ ] User can view single trip details
- [ ] User can delete a trip
- [ ] Route optimization returns data (placeholder)

## Code Quality

- [ ] No console errors
- [ ] No TypeScript/ESLint errors
- [ ] All API responses return proper status codes
- [ ] Error handling works correctly
- [ ] Passwords are hashed (not plain text)
- [ ] CORS is configured correctly

## Documentation

- [ ] Read `README.md`
- [ ] Read `SETUP_GUIDE.md`
- [ ] Read `API_DOCUMENTATION.md`
- [ ] Read `FRONTEND_INTEGRATION.md`

## Security Checklist

- [ ] `.env` file is not committed to git
- [ ] Passwords are hashed with bcrypt
- [ ] No sensitive data in code
- [ ] CORS configured for specific origin
- [ ] Error messages don't expose sensitive info

## Production Readiness (Future)

- [ ] Environment variables for production
- [ ] Database backups configured
- [ ] Error logging implemented
- [ ] Rate limiting added
- [ ] Input validation middleware
- [ ] Unit tests written
- [ ] API documentation updated

---

## Quick Test Commands

```bash
# Test server is running
curl http://localhost:5000/

# Test registration
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"password123"}'

# Test login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"password123"}'
```

---

## If Something Fails

1. Check error messages in console
2. Verify `.env` file configuration
3. Test MongoDB connection string
4. Check MongoDB Atlas network access
5. Verify all dependencies installed
6. Check port 5000 is available
7. Review `SETUP_GUIDE.md` troubleshooting section

---

**Status:** ☐ Not Started | ☐ In Progress | ☐ Complete

