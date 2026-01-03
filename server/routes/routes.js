import express from 'express';
import { optimizeRoute, getRouteData } from '../controllers/routeController.js';

const router = express.Router();

router.post('/optimize', optimizeRoute);
router.post('/route-data', getRouteData);

export default router;

