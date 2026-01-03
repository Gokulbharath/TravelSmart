import Trip from '../models/Trip.js';

// @desc    Create a new trip
// @route   POST /api/trips
// @access  Public (for now, can add auth later)
export const createTrip = async (req, res) => {
  try {
    const {
      userId,
      title,
      source,
      destination,
      date,
      time,
      transportMode,
    } = req.body;

    // Validation
    if (!userId || !title || !source || !destination || !date || !time) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    const trip = await Trip.create({
      userId,
      title,
      source,
      destination,
      travelDate: date,
      travelTime: time,
      transportMode: transportMode || 'car',
      status: 'upcoming',
    });

    res.status(201).json({
      success: true,
      trip: {
        id: trip._id,
        userId: trip.userId,
        title: trip.title,
        source: trip.source,
        destination: trip.destination,
        date: trip.travelDate,
        time: trip.travelTime,
        transportMode: trip.transportMode,
        status: trip.status,
        distance: trip.distance,
        duration: trip.duration,
        createdAt: trip.createdAt.toISOString().split('T')[0],
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error creating trip',
    });
  }
};

// @desc    Get all trips for a user
// @route   GET /api/trips/:userId
// @access  Public (for now, can add auth later)
export const getTrips = async (req, res) => {
  try {
    const { userId } = req.params;

    const trips = await Trip.find({ userId }).sort({ createdAt: -1 });

    const formattedTrips = trips.map((trip) => ({
      id: trip._id,
      userId: trip.userId,
      title: trip.title,
      source: trip.source,
      destination: trip.destination,
      date: trip.travelDate,
      time: trip.travelTime,
      transportMode: trip.transportMode,
      status: trip.status,
      distance: trip.distance,
      duration: trip.duration,
      createdAt: trip.createdAt.toISOString().split('T')[0],
    }));

    res.status(200).json({
      success: true,
      trips: formattedTrips,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching trips',
    });
  }
};

// @desc    Get single trip by ID
// @route   GET /api/trip/:id
// @access  Public (for now, can add auth later)
export const getTripById = async (req, res) => {
  try {
    const { id } = req.params;

    const trip = await Trip.findById(id);
    if (!trip) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found',
      });
    }

    res.status(200).json({
      success: true,
      trip: {
        id: trip._id,
        userId: trip.userId,
        title: trip.title,
        source: trip.source,
        destination: trip.destination,
        date: trip.travelDate,
        time: trip.travelTime,
        transportMode: trip.transportMode,
        status: trip.status,
        distance: trip.distance,
        duration: trip.duration,
        optimizedRoute: trip.optimizedRoute,
        createdAt: trip.createdAt.toISOString().split('T')[0],
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching trip',
    });
  }
};

// @desc    Delete a trip
// @route   DELETE /api/trip/:id
// @access  Public (for now, can add auth later)
export const deleteTrip = async (req, res) => {
  try {
    const { id } = req.params;

    const trip = await Trip.findByIdAndDelete(id);
    if (!trip) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Trip deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error deleting trip',
    });
  }
};

// @desc    Update trip route optimization data
// @route   PUT /api/trip/:id/optimize
// @access  Public (for now, can add auth later)
export const updateTripRoute = async (req, res) => {
  try {
    const { id } = req.params;
    const { optimizedRoute } = req.body;

    const trip = await Trip.findById(id);
    if (!trip) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found',
      });
    }

    trip.optimizedRoute = optimizedRoute;
    if (optimizedRoute.distance) trip.distance = optimizedRoute.distance;
    if (optimizedRoute.duration) trip.duration = optimizedRoute.duration;

    await trip.save();

    res.status(200).json({
      success: true,
      trip: {
        id: trip._id,
        optimizedRoute: trip.optimizedRoute,
        distance: trip.distance,
        duration: trip.duration,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error updating trip route',
    });
  }
};

