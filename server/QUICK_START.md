# Quick Start Guide

Get the TravelSmart backend running in 5 minutes!

## Prerequisites Check

- [ ] Node.js installed (`node --version`)
- [ ] MongoDB Atlas account created
- [ ] MongoDB connection string ready

## 5-Minute Setup

### 1. Install Dependencies (1 min)
```bash
cd server
npm install
```

### 2. Create .env File (1 min)
Create a file named `.env` in the `server/` folder with:

```env
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/travelsmart?retryWrites=true&w=majority
PORT=5000
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

Replace `YOUR_USERNAME`, `YOUR_PASSWORD`, and `YOUR_CLUSTER` with your MongoDB Atlas details.

### 3. Start Server (30 seconds)
```bash
npm run dev
```

You should see:
```
Server running on port 5000
MongoDB Connected: ...
```

### 4. Test API (1 min)
Open browser: `http://localhost:5000`

Or test with curl:
```bash
curl http://localhost:5000/
```

### 5. Test Registration (1 min)
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@test.com","password":"password123"}'
```

## Success!

✅ Backend is running on `http://localhost:5000`
✅ MongoDB is connected
✅ API endpoints are ready

## Next Steps

1. **Connect Frontend:** See `FRONTEND_INTEGRATION.md`
2. **API Reference:** See `API_DOCUMENTATION.md`
3. **Full Setup:** See `SETUP_GUIDE.md`

## Common Issues

**MongoDB Connection Failed?**
- Check your connection string
- Whitelist your IP in MongoDB Atlas (Network Access)

**Port 5000 in use?**
- Change PORT in `.env` to 5001

**CORS errors?**
- Update CLIENT_URL in `.env` to match your frontend URL

## Need Help?

- `SETUP_GUIDE.md` - Detailed setup instructions
- `API_DOCUMENTATION.md` - Complete API reference
- `FRONTEND_INTEGRATION.md` - Frontend connection guide

