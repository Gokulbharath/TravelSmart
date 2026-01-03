import apiClient from './apiClient';
import {
  mockHotels,
  mockRestaurants,
  mockAttractions,
  mockRouteData,
} from './mockData';

export const mockAPI = {
  login: async (email, password) => {
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      return {
        success: response.data.success,
        user: response.data.user,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed. Please try again.',
      };
    }
  },

  register: async (userData) => {
    try {
      const response = await apiClient.post('/auth/register', userData);
      return {
        success: response.data.success,
        user: response.data.user,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed. Please try again.',
      };
    }
  },

  getTrips: async (userId) => {
    if (!userId) {
      return { success: false, trips: [], message: 'User ID is required' };
    }
    try {
      const response = await apiClient.get(`/trips/${userId}`);
      const trips = (response.data.trips || []).map((trip) => ({
        ...trip,
        date: trip.date || trip.travelDate,
        time: trip.time || trip.travelTime,
      }));
      return {
        success: response.data.success,
        trips,
      };
    } catch (error) {
      return {
        success: false,
        trips: [],
        message: error.response?.data?.message || 'Failed to fetch trips',
      };
    }
  },

  getTripById: async (id) => {
    try {
      const response = await apiClient.get(`/trips/trip/${id}`);
      const trip = response.data.trip;
      return {
        success: response.data.success,
        trip: trip ? {
          ...trip,
          date: trip.date || trip.travelDate,
          time: trip.time || trip.travelTime,
        } : null,
      };
    } catch (error) {
      return {
        success: false,
        trip: null,
        message: error.response?.data?.message || 'Trip not found',
      };
    }
  },

  createTrip: async (tripData) => {
    try {
      const response = await apiClient.post('/trips', {
        userId: tripData.userId,
        title: tripData.title,
        source: tripData.source,
        destination: tripData.destination,
        date: tripData.date,
        time: tripData.time,
        transportMode: tripData.transportMode,
      });
      const trip = response.data.trip;
      return {
        success: response.data.success,
        trip: trip ? {
          ...trip,
          date: trip.date || trip.travelDate,
          time: trip.time || trip.travelTime,
        } : null,
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
      const response = await apiClient.delete(`/trips/trip/${id}`);
      return {
        success: response.data.success,
        message: response.data.message || 'Trip deleted successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to delete trip',
      };
    }
  },

  optimizeRoute: async (routeData) => {
    try {
      const response = await apiClient.post('/routes/optimize', routeData);
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
      const response = await apiClient.post('/routes/route-data', {
        source,
        destination,
      });
      return {
        success: response.data.success,
        route: response.data.route || mockRouteData,
      };
    } catch (error) {
      return {
        success: true,
        route: mockRouteData,
      };
    }
  },

  getHotels: async (location) => {
    return { success: true, hotels: mockHotels };
  },

  getRestaurants: async (location) => {
    return { success: true, restaurants: mockRestaurants };
  },

  getAttractions: async (location) => {
    return { success: true, attractions: mockAttractions };
  },

  updateProfile: async (userId, profileData) => {
    try {
      const response = await apiClient.put(`/auth/profile/${userId}`, {
        name: profileData.name,
        email: profileData.email,
        phone: profileData.phone,
        preferences: profileData.preferences,
      });
      return {
        success: response.data.success,
        message: response.data.message || 'Profile updated successfully',
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
