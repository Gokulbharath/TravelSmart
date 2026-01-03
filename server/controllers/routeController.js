import {
  dijkstra,
  getGraphData,
  formatDistance,
  calculateEstimatedTime,
  calculateETA,
  calculateFuelCost,
  calculateTollCost,
} from '../algorithms/dijkstra.js';

// @desc    Optimize route using Dijkstra's Algorithm
// @route   POST /api/routes/optimize
// @access  Public
export const optimizeRoute = async (req, res) => {
  try {
    const { source, destination, transportMode } = req.body;

    // Validation
    if (!source || !destination) {
      return res.status(400).json({
        success: false,
        message: 'Please provide source and destination',
      });
    }

    // Get graph data (contains graph structure and location mapping)
    const { graph, locationMap } = getGraphData();

    // Run Dijkstra's algorithm to find shortest path
    const result = dijkstra(graph, source, destination);

    // If route not found
    if (!result.found) {
      return res.status(404).json({
        success: false,
        message: result.error || 'No route found between source and destination',
        optimizedRoute: null,
      });
    }

    // Convert normalized path back to original location names
    const optimizedPath = result.path.map(
      (normalizedLocation) =>
        locationMap[normalizedLocation] || normalizedLocation
    );

    // Calculate additional route information
    const distance = result.distance;
    const estimatedTime = calculateEstimatedTime(
      distance,
      transportMode || 'car'
    );
    const eta = calculateETA(estimatedTime);
    const fuelCost = calculateFuelCost(distance);
    const tollCost = calculateTollCost(distance, transportMode);

    // Format response for frontend
    const optimizedRoute = {
      distance: formatDistance(distance),
      duration: estimatedTime,
      eta: eta,
      fuelCost: fuelCost,
      tollCost: tollCost,
      optimizedPath: optimizedPath, // Array of location names in order
      algorithm: 'Dijkstra',
      totalDistance: distance, // Actual numeric distance for calculations
    };

    res.status(200).json({
      success: true,
      optimizedRoute,
      message: 'Route optimized successfully using Dijkstra algorithm',
    });
  } catch (error) {
    console.error('Route optimization error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error optimizing route',
    });
  }
};

// @desc    Get route data (for map visualization)
// @route   POST /api/routes/route-data
// @access  Public
export const getRouteData = async (req, res) => {
  try {
    const { source, destination } = req.body;

    if (!source || !destination) {
      return res.status(400).json({
        success: false,
        message: 'Please provide source and destination',
      });
    }

    // Get graph and run Dijkstra to get path
    const { graph, locationMap } = getGraphData();
    const result = dijkstra(graph, source, destination);

    if (!result.found) {
      return res.status(404).json({
        success: false,
        message: result.error || 'No route found',
        route: null,
      });
    }

    // Convert path to original location names
    const path = result.path.map(
      (normalizedLocation) =>
        locationMap[normalizedLocation] || normalizedLocation
    );

    // Mock coordinates for demo (in production, use geocoding API)
    const mockCoordinates = [
      { lat: 11.0168, lng: 76.9558 }, // Coimbatore
      { lat: 11.2995, lng: 76.9388 }, // Metupalayam
      { lat: 11.4102, lng: 76.6950 }, // Ooty
      { lat: 12.9716, lng: 77.5946 }, // Bangalore
      { lat: 9.9252, lng: 78.1198 },  // Madurai
    ];

    // Assign coordinates based on path length
    const coordinates = path.map((_, index) => {
      const coordIndex = index % mockCoordinates.length;
      return {
        lat: mockCoordinates[coordIndex].lat + (index * 0.1),
        lng: mockCoordinates[coordIndex].lng + (index * 0.1),
      };
    });

    // Create waypoints from path
    const waypoints = path.map((location, index) => ({
      name: location,
      lat: coordinates[index]?.lat || 11.0168,
      lng: coordinates[index]?.lng || 76.9558,
    }));

    const routeData = {
      coordinates: coordinates,
      waypoints: waypoints,
      path: path,
      distance: result.distance,
    };

    res.status(200).json({
      success: true,
      route: routeData,
      message: 'Route data retrieved successfully',
    });
  } catch (error) {
    console.error('Route data error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching route data',
    });
  }
};
