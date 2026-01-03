# TravelSmart API Documentation

Complete API reference for TravelSmart Backend.

## Base URL
```
http://localhost:5000/api
```

## Response Format

All responses follow this structure:
```json
{
  "success": true/false,
  "message": "Optional message",
  "data": {} // Response data
}
```

## Authentication Endpoints

### Register User
**POST** `/api/auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+1 234 567 8900" // Optional
}
```

**Response (201):**
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

**Error (400):**
```json
{
  "success": false,
  "message": "User with this email already exists"
}
```

---

### Login User
**POST** `/api/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
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

**Error (401):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

### Get User Profile
**GET** `/api/auth/profile/:userId`

**Response (200):**
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
    },
    "createdAt": "2024-01-10T00:00:00.000Z",
    "updatedAt": "2024-01-10T00:00:00.000Z"
  }
}
```

---

### Update User Profile
**PUT** `/api/auth/profile/:userId`

**Request Body:**
```json
{
  "name": "John Updated",
  "phone": "+1 999 999 9999",
  "preferences": {
    "transportMode": "train",
    "budget": "high",
    "avoidTraffic": true
  }
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Updated",
    "email": "john@example.com",
    "phone": "+1 999 999 9999",
    "preferences": {
      "transportMode": "train",
      "budget": "high",
      "avoidTraffic": true
    }
  }
}
```

---

## Trip Management Endpoints

### Create Trip
**POST** `/api/trips`

**Request Body:**
```json
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

**Response (201):**
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

---

### Get All Trips for User
**GET** `/api/trips/:userId`

**Response (200):**
```json
{
  "success": true,
  "trips": [
    {
      "id": "507f1f77bcf86cd799439012",
      "userId": "507f1f77bcf86cd799439011",
      "title": "Weekend in Paris",
      "source": "London, UK",
      "destination": "Paris, France",
      "date": "2024-02-15",
      "time": "09:00",
      "transportMode": "train",
      "status": "upcoming",
      "distance": "344 km",
      "duration": "2h 15m",
      "createdAt": "2024-01-10"
    }
  ]
}
```

---

### Get Single Trip
**GET** `/api/trips/trip/:id`

**Response (200):**
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
    "distance": "344 km",
    "duration": "2h 15m",
    "optimizedRoute": {
      "distance": "125 km",
      "duration": "1h 45m",
      "eta": "11:45 AM",
      "fuelCost": "$15",
      "tollCost": "$5"
    },
    "createdAt": "2024-01-10"
  }
}
```

---

### Delete Trip
**DELETE** `/api/trips/trip/:id`

**Response (200):**
```json
{
  "success": true,
  "message": "Trip deleted successfully"
}
```

---

### Update Trip Route Optimization
**PUT** `/api/trips/trip/:id/optimize`

**Request Body:**
```json
{
  "optimizedRoute": {
    "distance": "125 km",
    "duration": "1h 45m",
    "eta": "11:45 AM",
    "fuelCost": "$15",
    "tollCost": "$5"
  }
}
```

**Response (200):**
```json
{
  "success": true,
  "trip": {
    "id": "507f1f77bcf86cd799439012",
    "optimizedRoute": {
      "distance": "125 km",
      "duration": "1h 45m",
      "eta": "11:45 AM",
      "fuelCost": "$15",
      "tollCost": "$5"
    },
    "distance": "125 km",
    "duration": "1h 45m"
  }
}
```

---

## Route Optimization Endpoints

### Optimize Route (Placeholder)
**POST** `/api/routes/optimize`

**Request Body:**
```json
{
  "source": "London, UK",
  "destination": "Paris, France",
  "transportMode": "car"
}
```

**Response (200):**
```json
{
  "success": true,
  "optimizedRoute": {
    "distance": "125 km",
    "duration": "1h 45m",
    "eta": "11:45 AM",
    "fuelCost": "$15",
    "tollCost": "$5"
  },
  "message": "Route optimized (placeholder - algorithm not implemented yet)"
}
```

---

### Get Route Data (For Map)
**POST** `/api/routes/route-data`

**Request Body:**
```json
{
  "source": "London, UK",
  "destination": "Paris, France"
}
```

**Response (200):**
```json
{
  "success": true,
  "route": {
    "coordinates": [
      { "lat": 51.5074, "lng": -0.1278 },
      { "lat": 48.8566, "lng": 2.3522 }
    ],
    "waypoints": [
      { "name": "London, UK", "lat": 51.5074, "lng": -0.1278 },
      { "name": "Paris, France", "lat": 48.8566, "lng": 2.3522 }
    ]
  },
  "message": "Route data (placeholder - map API not integrated yet)"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Please provide all required fields"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Trip not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Error message here"
}
```

---

## Status Codes

- `200` - OK (Success)
- `201` - Created (Resource created successfully)
- `400` - Bad Request (Invalid input)
- `401` - Unauthorized (Invalid credentials)
- `404` - Not Found (Resource doesn't exist)
- `500` - Internal Server Error (Server error)

---

## Field Validations

### User
- **name**: Required, string
- **email**: Required, unique, valid email format
- **password**: Required, minimum 6 characters
- **phone**: Optional, string
- **preferences.transportMode**: car | train | bus | walk
- **preferences.budget**: low | medium | high

### Trip
- **userId**: Required, valid MongoDB ObjectId
- **title**: Required, string
- **source**: Required, string
- **destination**: Required, string
- **date**: Required, string (YYYY-MM-DD format)
- **time**: Required, string (HH:MM format)
- **transportMode**: car | train | bus | walk
- **status**: upcoming | completed

---

## Testing with cURL

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

### Create Trip
```bash
curl -X POST http://localhost:5000/api/trips \
  -H "Content-Type: application/json" \
  -d '{"userId":"USER_ID","title":"Test Trip","source":"City A","destination":"City B","date":"2024-02-15","time":"09:00","transportMode":"car"}'
```

### Get Trips
```bash
curl http://localhost:5000/api/trips/USER_ID
```

