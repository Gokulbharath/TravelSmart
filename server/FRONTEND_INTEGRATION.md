# Frontend Integration Guide

This guide shows how to update the frontend to connect to the real backend API instead of using mock data.

## Step 1: Install Axios

Navigate to the TravelSmart frontend directory and install axios:

```bash
cd TravelSmart
npm install axios
```

## Step 2: Create API Configuration

Create a new file `src/utils/api.js`:

```javascript
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
```

## Step 3: Update mockAPI.js

Replace the mock functions with real API calls. Here's the updated `mockAPI.js`:

```javascript
import api from './api';

// Remove mock data imports
// import { mockUsers, mockTrips, ... } from './mockData';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockAPI = {
  // Authentication
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      return {
        success: response.data.success,
        user: response.data.user,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed',
      };
    }
  },

  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return {
        success: response.data.success,
        user: response.data.user,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed',
      };
    }
  },

  // Trip Management
  getTrips: async (userId) => {
    try {
      const response = await api.get(`/trips/${userId}`);
      return {
        success: response.data.success,
        trips: response.data.trips,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch trips',
        trips: [],
      };
    }
  },

  getTripById: async (id) => {
    try {
      const response = await api.get(`/trips/trip/${id}`);
      return {
        success: response.data.success,
        trip: response.data.trip,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Trip not found',
      };
    }
  },

  createTrip: async (tripData) => {
    try {
      // tripData should include userId
      const response = await api.post('/trips', {
        userId: tripData.userId,
        title: tripData.title,
        source: tripData.source,
        destination: tripData.destination,
        date: tripData.date,
        time: tripData.time,
        transportMode: tripData.transportMode,
      });
      return {
        success: response.data.success,
        trip: response.data.trip,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to create trip',
      };
    }
  },

  deleteTrip: async (id) => {
    try {
      const response = await api.delete(`/trips/trip/${id}`);
      return {
        success: response.data.success,
        message: response.data.message,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to delete trip',
      };
    }
  },

  // Route Optimization
  optimizeRoute: async (routeData) => {
    try {
      const response = await api.post('/routes/optimize', routeData);
      return {
        success: response.data.success,
        optimizedRoute: response.data.optimizedRoute,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Route optimization failed',
      };
    }
  },

  getRouteData: async (source, destination) => {
    try {
      const response = await api.post('/routes/route-data', {
        source,
        destination,
      });
      return {
        success: response.data.success,
        route: response.data.route,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to get route data',
      };
    }
  },

  // Recommendations (Keep as mock for now - no backend endpoints yet)
  getHotels: async (location) => {
    await delay(400);
    // Return mock data or implement backend endpoint
    return { success: true, hotels: [] };
  },

  getRestaurants: async (location) => {
    await delay(400);
    // Return mock data or implement backend endpoint
    return { success: true, restaurants: [] };
  },

  getAttractions: async (location) => {
    await delay(400);
    // Return mock data or implement backend endpoint
    return { success: true, attractions: [] };
  },

  // Profile Management
  updateProfile: async (userId, profileData) => {
    try {
      const response = await api.put(`/auth/profile/${userId}`, profileData);
      return {
        success: response.data.success,
        message: response.data.message,
        user: response.data.user,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to update profile',
      };
    }
  },
};
```

## Step 4: Update AuthContext.jsx

Update the `getTrips` call to include userId:

```javascript
// In AuthContext.jsx or Dashboard.jsx
const fetchTrips = async () => {
  if (!user?.id) return; // Make sure user is loaded
  
  const response = await mockAPI.getTrips(user.id);
  if (response.success) {
    setTrips(response.trips);
  }
};
```

## Step 5: Update PlanTrip.jsx

Update the `createTrip` call to include userId:

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  const response = await mockAPI.createTrip({
    userId: user.id, // Add this
    title: formData.title,
    source: formData.source,
    destination: formData.destination,
    date: formData.date,
    time: formData.time,
    transportMode: formData.transportMode,
  });

  // ... rest of the code
};
```

## Step 6: Update Profile.jsx

Update the `updateProfile` call:

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  const response = await mockAPI.updateProfile(user.id, {
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    preferences: {
      transportMode: formData.transportMode,
      budget: formData.budget,
    },
  });

  if (response.success) {
    updateUser(response.user);
    // ... rest of the code
  }
};
```

## Step 7: Add Environment Variable

Create or update `.env` file in TravelSmart root:

```env
VITE_API_URL=http://localhost:5000/api
```

## Step 8: Update AuthContext to store user ID

Make sure AuthContext stores the user ID properly:

```javascript
// In login function
if (response.success) {
  setUser({
    ...response.user,
    id: response.user.id, // Ensure ID is stored
  });
  localStorage.setItem('user', JSON.stringify(response.user));
}
```

## Testing the Integration

1. Start the backend server:
```bash
cd server
npm install
npm run dev
```

2. Start the frontend:
```bash
cd TravelSmart
npm run dev
```

3. Test the flow:
   - Register a new user
   - Login
   - Create a trip
   - View trips
   - Update profile

## Troubleshooting

### CORS Errors
- Make sure `CLIENT_URL` in server `.env` matches your frontend URL
- Default is `http://localhost:5173` (Vite default)

### 404 Errors
- Check that backend server is running on port 5000
- Verify API endpoint URLs match backend routes

### Authentication Issues
- Ensure user ID is stored in localStorage after login
- Check that userId is being sent with trip creation requests

### MongoDB Connection Issues
- Verify MongoDB Atlas connection string in server `.env`
- Check IP whitelist in MongoDB Atlas (allow 0.0.0.0/0 for development)

## Keeping Mock Data as Fallback

You can keep mock data as a fallback option:

```javascript
export const mockAPI = {
  login: async (email, password) => {
    try {
      // Try real API first
      const response = await api.post('/auth/login', { email, password });
      return response.data;
    } catch (error) {
      // Fallback to mock data if API fails
      console.warn('API failed, using mock data');
      return mockLogin(email, password);
    }
  },
  // ... other methods
};
```

