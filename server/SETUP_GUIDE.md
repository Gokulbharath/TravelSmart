# TravelSmart Backend Setup Guide

Complete step-by-step guide to set up and run the TravelSmart backend server.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account (free tier is fine)
- npm or yarn package manager

## Step 1: MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account or log in
3. Create a new cluster (choose free tier)
4. Click "Connect" → "Connect your application"
5. Copy the connection string (it looks like):
   ```
   mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
   ```
6. Replace `<password>` with your database password
7. Replace `dbname` with `travelsmart` (or your preferred database name)

## Step 2: Install Dependencies

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install all dependencies:
   ```bash
   npm install
   ```

This will install:
- express
- mongoose
- bcrypt
- dotenv
- cors

## Step 3: Configure Environment Variables

1. Create a `.env` file in the server directory:
   ```bash
   # Windows
   type nul > .env
   
   # Mac/Linux
   touch .env
   ```

2. Add the following content to `.env`:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/travelsmart?retryWrites=true&w=majority
   PORT=5000
   NODE_ENV=development
   CLIENT_URL=http://localhost:5173
   ```

3. Replace the `MONGODB_URI` with your actual MongoDB Atlas connection string

**Important:** Never commit the `.env` file to version control. It's already in `.gitignore`.

## Step 4: MongoDB Atlas Network Access

1. In MongoDB Atlas dashboard, go to "Network Access"
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0) for development
   - Or add your specific IP address for production

## Step 5: Run the Server

### Development Mode (with auto-reload):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

You should see:
```
Server running on port 5000
Environment: development
MongoDB Connected: cluster0.xxxxx.mongodb.net
```

## Step 6: Test the API

Open your browser or use a tool like Postman/Thunder Client:

1. **Test root endpoint:**
   ```
   http://localhost:5000/
   ```
   Should return API information

2. **Test registration:**
   ```
   POST http://localhost:5000/api/auth/register
   Body (JSON):
   {
     "name": "Test User",
     "email": "test@example.com",
     "password": "password123"
   }
   ```

3. **Test login:**
   ```
   POST http://localhost:5000/api/auth/login
   Body (JSON):
   {
     "email": "test@example.com",
     "password": "password123"
   }
   ```

## Step 7: Connect Frontend

1. See `FRONTEND_INTEGRATION.md` for detailed frontend connection instructions
2. Update frontend to use the backend API instead of mock data
3. Make sure frontend runs on `http://localhost:5173` (Vite default)

## Troubleshooting

### MongoDB Connection Failed

**Error:** `MongoServerError: bad auth`

**Solution:**
- Check your MongoDB Atlas username and password
- Make sure you replaced `<password>` in the connection string
- Verify the database user exists in MongoDB Atlas

**Error:** `MongooseServerSelectionError`

**Solution:**
- Check your internet connection
- Verify IP address is whitelisted in MongoDB Atlas
- Try allowing access from anywhere (0.0.0.0/0)

### Port Already in Use

**Error:** `Error: listen EADDRINUSE: address already in use :::5000`

**Solution:**
- Change PORT in `.env` file to a different port (e.g., 5001)
- Or stop the process using port 5000:
  ```bash
  # Windows
  netstat -ano | findstr :5000
  taskkill /PID <PID> /F
  
  # Mac/Linux
  lsof -ti:5000 | xargs kill
  ```

### CORS Errors

**Error:** `CORS policy: No 'Access-Control-Allow-Origin' header`

**Solution:**
- Update `CLIENT_URL` in `.env` to match your frontend URL
- Default is `http://localhost:5173` (Vite default port)

### Module Not Found

**Error:** `Cannot find module 'express'`

**Solution:**
```bash
cd server
npm install
```

### Environment Variables Not Loading

**Solution:**
- Make sure `.env` file is in the `server/` directory
- Check that `.env` file has correct format (no spaces around `=`)
- Restart the server after changing `.env`

## Project Structure

```
server/
├── config/
│   └── db.js                 # MongoDB connection
├── controllers/
│   ├── authController.js     # Auth logic
│   ├── tripController.js     # Trip CRUD
│   └── routeController.js    # Route optimization
├── middleware/
│   └── errorHandler.js       # Error handling
├── models/
│   ├── User.js              # User schema
│   └── Trip.js              # Trip schema
├── routes/
│   ├── auth.js              # Auth routes
│   ├── trips.js             # Trip routes
│   └── routes.js            # Route optimization routes
├── .env                     # Environment variables (create this)
├── .env.example            # Environment template
├── .gitignore              # Git ignore file
├── package.json            # Dependencies
├── server.js               # Entry point
├── README.md               # Main documentation
├── SETUP_GUIDE.md          # This file
├── API_DOCUMENTATION.md    # API reference
└── FRONTEND_INTEGRATION.md # Frontend connection guide
```

## Next Steps

1. ✅ Backend is running
2. ✅ Test all endpoints
3. ✅ Connect frontend (see `FRONTEND_INTEGRATION.md`)
4. ✅ Test full user flow (register → login → create trip)
5. 🔄 Implement route optimization algorithm (future)
6. 🔄 Integrate Google Maps API (future)

## Support

For issues or questions:
1. Check `API_DOCUMENTATION.md` for endpoint details
2. Check `FRONTEND_INTEGRATION.md` for frontend connection
3. Review error messages and troubleshoot section above

