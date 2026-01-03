# TravelSmart Backend API

Complete Node.js/Express/MongoDB backend for TravelSmart travel planning application.

## Features

- ✅ RESTful API with Express.js
- ✅ MongoDB Atlas integration with Mongoose
- ✅ Simple authentication (email + password with bcrypt)
- ✅ User management (register, login, profile)
- ✅ Trip management (CRUD operations)
- ✅ Route optimization placeholder (ready for algorithm implementation)
- ✅ Error handling middleware
- ✅ CORS enabled for frontend

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB Atlas
- **ORM:** Mongoose
- **Security:** bcrypt for password hashing
- **Environment:** dotenv

## Installation

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Update `.env` with your MongoDB Atlas connection string:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/travelsmart?retryWrites=true&w=majority
PORT=5000
CLIENT_URL=http://localhost:5173
```

## Running the Server

### Development Mode (with auto-reload):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

Server will run on `http://localhost:5000` (or PORT from .env)

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile/:userId` - Get user profile
- `PUT /api/auth/profile/:userId` - Update user profile

### Trips
- `POST /api/trips` - Create new trip
- `GET /api/trips/:userId` - Get all trips for user
- `GET /api/trips/trip/:id` - Get single trip
- `DELETE /api/trips/trip/:id` - Delete trip
- `PUT /api/trips/trip/:id/optimize` - Update trip route optimization

### Routes
- `POST /api/routes/optimize` - Optimize route (placeholder)
- `POST /api/routes/route-data` - Get route data for map (placeholder)

## Database Models

### User Model
- name (String, required)
- email (String, required, unique)
- password (String, required, hashed with bcrypt)
- phone (String, optional)
- preferences (Object)
  - transportMode (car/train/bus/walk)
  - budget (low/medium/high)
  - avoidTraffic (Boolean)
- createdAt, updatedAt (auto-generated)

### Trip Model
- userId (ObjectId, reference to User)
- title (String, required)
- source (String, required)
- destination (String, required)
- travelDate (String, required)
- travelTime (String, required)
- transportMode (car/train/bus/walk)
- status (upcoming/completed)
- distance (String)
- duration (String)
- optimizedRoute (Object)
- createdAt, updatedAt (auto-generated)

## Request/Response Examples

### Register User
**Request:**
```json
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+1 234 567 8900"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1 234 567 8900",
    "preferences": {
      "transportMode": "car",
      "budget": "medium"
    }
  }
}
```

### Login
**Request:**
```json
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1 234 567 8900",
    "preferences": {
      "transportMode": "car",
      "budget": "medium"
    }
  }
}
```

### Create Trip
**Request:**
```json
POST /api/trips
{
  "userId": "507f1f77bcf86cd799439011",
  "title": "Weekend in Paris",
  "source": "London, UK",
  "destination": "Paris, France",
  "date": "2024-02-15",
  "time": "09:00",
  "transportMode": "train"
}
```

**Response:**
```json
{
  "success": true,
  "trip": {
    "id": "507f1f77bcf86cd799439012",
    "userId": "507f1f77bcf86cd799439011",
    "title": "Weekend in Paris",
    "source": "London, UK",
    "destination": "Paris, France",
    "date": "2024-02-15",
    "time": "09:00",
    "transportMode": "train",
    "status": "upcoming",
    "distance": "",
    "duration": "",
    "createdAt": "2024-01-10"
  }
}
```

## Error Handling

All errors return JSON with this format:
```json
{
  "success": false,
  "message": "Error message here"
}
```

HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

## Frontend Integration

To connect the frontend:

1. Install axios in frontend:
```bash
cd TravelSmart
npm install axios
```

2. Update `mockAPI.js` to use real API endpoints (see integration guide below)

3. Base URL: `http://localhost:5000/api`

## Security Notes

- Passwords are hashed using bcrypt (10 salt rounds)
- Passwords are never returned in API responses
- Email validation using regex
- CORS configured for frontend URL
- No JWT/sessions (simple authentication as requested)

## Future Enhancements

- [ ] Implement Dijkstra's or A* algorithm for route optimization
- [ ] Integrate Google Maps API or Mapbox for real route data
- [ ] Add input validation middleware
- [ ] Add rate limiting
- [ ] Add request logging
- [ ] Add unit tests

## Project Structure

```
server/
├── config/
│   └── db.js              # MongoDB connection
├── controllers/
│   ├── authController.js  # Authentication logic
│   ├── tripController.js  # Trip CRUD operations
│   └── routeController.js # Route optimization
├── middleware/
│   └── errorHandler.js    # Error handling
├── models/
│   ├── User.js           # User schema
│   └── Trip.js           # Trip schema
├── routes/
│   ├── auth.js           # Auth routes
│   ├── trips.js          # Trip routes
│   └── routes.js         # Route optimization routes
├── .env.example          # Environment template
├── package.json          # Dependencies
├── server.js             # Entry point
└── README.md            # This file
```

