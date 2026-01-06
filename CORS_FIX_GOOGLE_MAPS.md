# CORS Fix for Google Maps API

## Problem
Google Maps REST API blocks direct browser requests due to CORS policy. Error:
```
Access to fetch at 'https://maps.googleapis.com/maps/api/directions/json?...' 
from origin 'http://localhost:5173' has been blocked by CORS policy
```

## Solution
Created backend proxy endpoints to handle Google Maps API calls server-side.

## Changes Made

### Backend (Server)

1. **Added new routes** (`server/routes/routes.js`):
   - `POST /api/routes/google-directions` - Single route
   - `POST /api/routes/google-multiple-routes` - Multiple routes with alternatives

2. **New controllers** (`server/controllers/routeController.js`):
   - `getGoogleDirections()` - Proxies single route request
   - `getGoogleMultipleRoutes()` - Proxies multiple routes request

3. **Installed axios** (`server/package.json`):
   - Added axios for HTTP requests in Node.js

4. **Environment variable** (`server/.env`):
   - Added `GOOGLE_MAPS_API_KEY=your_key_here`

### Frontend (Client)

1. **Updated** (`client/src/utils/googleMaps.js`):
   - `getGoogleDirections()` - Now calls backend proxy
   - `getMultipleRoutes()` - Now calls backend proxy
   - `geocodeAddress()` - Still uses direct API (no CORS issue)

## API Endpoints

### Backend Proxy Endpoints

**Single Route:**
```
POST /api/routes/google-directions
Body: { source, destination, transportMode }
```

**Multiple Routes:**
```
POST /api/routes/google-multiple-routes
Body: { source, destination, transportMode }
```

## Configuration

### Server `.env` file:
```env
GOOGLE_MAPS_API_KEY=AIzaSyCABEao-fhKlL_0M3JhW6ix5Klg4Y4NrFs
```

### Client `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

## How It Works

1. **Before (Direct Call - CORS Error):**
   ```
   Browser → Google Maps API ❌ (CORS blocked)
   ```

2. **After (Proxy - Works):**
   ```
   Browser → Backend Server → Google Maps API ✅
   ```

## Testing

1. Restart backend server:
   ```bash
   cd server
   npm start
   ```

2. Restart frontend:
   ```bash
   cd client
   npm run dev
   ```

3. Test route optimization:
   - Create a trip
   - Go to Map View
   - Routes should load without CORS errors

## Benefits

✅ No CORS errors  
✅ API key secured on backend  
✅ Better error handling  
✅ Consistent with existing backend architecture  
✅ All routes work (single and multiple)

