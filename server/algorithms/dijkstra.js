/**
 * Dijkstra's Algorithm for Shortest Path Finding
 * 
 * This implementation finds the shortest path between two nodes in a weighted graph.
 * Uses a priority queue approach with distance tracking.
 * 
 * Algorithm Explanation:
 * 1. Initialize distances to all nodes as infinity, except start node (0)
 * 2. Create a priority queue/min-heap of unvisited nodes
 * 3. While queue is not empty:
 *    - Extract node with minimum distance (current node)
 *    - For each neighbor of current node:
 *      - Calculate new distance = current distance + edge weight
 *      - If new distance < known distance, update it
 *      - Track previous node for path reconstruction
 * 4. Reconstruct path from start to end using previous node tracking
 * 
 * Time Complexity: O(V²) where V is number of vertices
 * Space Complexity: O(V) for storing distances and previous nodes
 */

/**
 * Normalize location name for lookup (case-insensitive, trim whitespace)
 */
const normalizeLocation = (location) => {
  return location.trim().toLowerCase();
};

/**
 * Build a graph from location data
 * Graph structure: { node: { neighbor: weight, ... }, ... }
 */
const buildGraph = () => {
  // Demo graph with real Indian city locations and distances (in km)
  // This is a static graph for demonstration purposes
  const graph = {
    'coimbatore': {
      'metupalayam': 38,
      'ooty': 86,
      'palani': 115,
      'tiruppur': 47,
    },
    'metupalayam': {
      'coimbatore': 38,
      'ooty': 48,
      'kotagiri': 42,
    },
    'ooty': {
      'coimbatore': 86,
      'metupalayam': 48,
      'kotagiri': 32,
      'coonoor': 18,
    },
    'kotagiri': {
      'metupalayam': 42,
      'ooty': 32,
      'coonoor': 12,
    },
    'coonoor': {
      'ooty': 18,
      'kotagiri': 12,
    },
    'palani': {
      'coimbatore': 115,
      'dindigul': 65,
    },
    'dindigul': {
      'palani': 65,
      'madurai': 65,
    },
    'madurai': {
      'dindigul': 65,
      'tirunelveli': 160,
    },
    'tiruppur': {
      'coimbatore': 47,
      'erode': 52,
    },
    'erode': {
      'tiruppur': 52,
      'salem': 100,
    },
    'salem': {
      'erode': 100,
      'bangalore': 200,
    },
    'bangalore': {
      'salem': 200,
      'mysore': 145,
    },
    'mysore': {
      'bangalore': 145,
      'ooty': 150,
    },
    'tirunelveli': {
      'madurai': 160,
    },
  };

  // Normalize all keys for case-insensitive lookup
  const normalizedGraph = {};
  const locationMap = {}; // Map normalized to original

  for (const [key, neighbors] of Object.entries(graph)) {
    const normalizedKey = normalizeLocation(key);
    locationMap[normalizedKey] = key;
    normalizedGraph[normalizedKey] = {};

    for (const [neighbor, weight] of Object.entries(neighbors)) {
      const normalizedNeighbor = normalizeLocation(neighbor);
      locationMap[normalizedNeighbor] = neighbor;
      normalizedGraph[normalizedKey][normalizedNeighbor] = weight;
    }
  }

  return { graph: normalizedGraph, locationMap };
};

/**
 * Find the node with minimum distance from unvisited set
 */
const findMinDistanceNode = (distances, visited) => {
  let minDistance = Infinity;
  let minNode = null;

  for (const node in distances) {
    if (!visited[node] && distances[node] < minDistance) {
      minDistance = distances[node];
      minNode = node;
    }
  }

  return minNode;
};

/**
 * Dijkstra's Algorithm Implementation
 * 
 * @param {Object} graph - Graph representation { node: { neighbor: weight } }
 * @param {string} start - Starting node (normalized)
 * @param {string} end - Destination node (normalized)
 * @returns {Object} - { distance: number, path: string[], found: boolean }
 */
export const dijkstra = (graph, start, end) => {
  // Normalize input locations
  const startNode = normalizeLocation(start);
  const endNode = normalizeLocation(end);

  // Check if nodes exist in graph
  if (!graph[startNode]) {
    return {
      distance: Infinity,
      path: [],
      found: false,
      error: `Source location "${start}" not found in route network`,
    };
  }

  if (!graph[endNode]) {
    return {
      distance: Infinity,
      path: [],
      found: false,
      error: `Destination location "${end}" not found in route network`,
    };
  }

  // If start and end are same
  if (startNode === endNode) {
    return {
      distance: 0,
      path: [start],
      found: true,
    };
  }

  // Initialize distances and previous nodes
  const distances = {};
  const previous = {};
  const visited = {};

  // Set all distances to infinity except start node
  for (const node in graph) {
    distances[node] = Infinity;
    previous[node] = null;
    visited[node] = false;
  }

  distances[startNode] = 0;

  // Main algorithm loop
  while (true) {
    // Find unvisited node with minimum distance
    const currentNode = findMinDistanceNode(distances, visited);

    // If no more nodes or reached destination
    if (currentNode === null || currentNode === endNode) {
      break;
    }

    visited[currentNode] = true;

    // Update distances to neighbors
    const neighbors = graph[currentNode] || {};
    for (const neighbor in neighbors) {
      if (!visited[neighbor]) {
        const edgeWeight = neighbors[neighbor];
        const newDistance = distances[currentNode] + edgeWeight;

        // If found shorter path, update it
        if (newDistance < distances[neighbor]) {
          distances[neighbor] = newDistance;
          previous[neighbor] = currentNode;
        }
      }
    }
  }

  // Reconstruct path from end to start
  const path = [];
  let currentNode = endNode;

  // If destination is unreachable
  if (distances[endNode] === Infinity) {
    return {
      distance: Infinity,
      path: [],
      found: false,
      error: 'No route found between source and destination',
    };
  }

  // Build path by following previous nodes
  while (currentNode !== null) {
    path.unshift(currentNode);
    currentNode = previous[currentNode];
  }

  return {
    distance: distances[endNode],
    path: path,
    found: true,
  };
};

/**
 * Get graph and location mapping
 * Exported for use in route controller
 */
export const getGraphData = () => {
  return buildGraph();
};

/**
 * Format distance for display
 */
export const formatDistance = (distance) => {
  if (distance === Infinity) return 'N/A';
  return `${distance} km`;
};

/**
 * Calculate estimated time based on distance and transport mode
 * 
 * @param {number} distance - Distance in kilometers
 * @param {string} transportMode - 'car', 'train', 'bus', 'walk'
 * @returns {string} - Formatted time string (e.g., "2h 30m")
 */
export const calculateEstimatedTime = (distance, transportMode) => {
  if (distance === Infinity) return 'N/A';

  // Average speeds in km/h based on transport mode
  const speeds = {
    car: 60,      // 60 km/h average
    train: 80,    // 80 km/h average
    bus: 50,      // 50 km/h average
    walk: 5,      // 5 km/h average (walking speed)
  };

  const speed = speeds[transportMode] || speeds.car;
  const hours = distance / speed;

  // Format as hours and minutes
  const totalMinutes = Math.round(hours * 60);
  const hoursPart = Math.floor(totalMinutes / 60);
  const minutesPart = totalMinutes % 60;

  if (hoursPart === 0) {
    return `${minutesPart}m`;
  } else if (minutesPart === 0) {
    return `${hoursPart}h`;
  } else {
    return `${hoursPart}h ${minutesPart}m`;
  }
};

/**
 * Calculate estimated arrival time (ETA)
 */
export const calculateETA = (durationString) => {
  // Parse duration string (e.g., "2h 30m")
  const timeMatch = durationString.match(/(\d+)h\s*(\d+)?m?/);
  if (!timeMatch) return new Date().toLocaleTimeString();

  const hours = parseInt(timeMatch[1]) || 0;
  const minutes = parseInt(timeMatch[2]) || 0;

  const now = new Date();
  now.setHours(now.getHours() + hours);
  now.setMinutes(now.getMinutes() + minutes);

  return now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

const USD_TO_INR = 83;

/**
 * Calculate fuel cost estimate (for car mode) in INR
 */
export const calculateFuelCost = (distance, fuelPricePerKm = 0.12) => {
  if (distance === Infinity) return 0;
  const costUSD = distance * fuelPricePerKm;
  return Math.round(costUSD * USD_TO_INR);
};

/**
 * Calculate toll cost (simplified - based on distance) in INR
 */
export const calculateTollCost = (distance, transportMode) => {
  if (distance === Infinity || transportMode !== 'car') return 0;
  
  // Assume toll every 50km, average $2 per toll
  const tolls = Math.floor(distance / 50);
  const costUSD = tolls * 2;
  
  return costUSD > 0 ? Math.round(costUSD * USD_TO_INR) : 0;
};



