import express from 'express';
import {
  createTrip,
  getTrips,
  getTripById,
  deleteTrip,
  updateTripRoute,
} from '../controllers/tripController.js';

const router = express.Router();

// Route order matters - specific routes before parameterized routes
router.post('/', createTrip);
router.get('/trip/:id', getTripById);
router.delete('/trip/:id', deleteTrip);
router.put('/trip/:id/optimize', updateTripRoute);
router.get('/:userId', getTrips); // Keep this last to avoid conflict

export default router;

