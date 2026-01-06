# Route Optimization Algorithm

## Dijkstra's Algorithm Implementation

### Overview
This implementation uses Dijkstra's algorithm to find the shortest path between two locations in a weighted graph.

### Graph Structure
- **Nodes**: Locations (cities/towns)
- **Edges**: Roads connecting locations
- **Weights**: Distance in kilometers

### Example Graph
```
Coimbatore ---38km--- Metupalayam ---48km--- Ooty
    |                     |              |
   47km                  42km           18km
    |                     |              |
 Tiruppur             Kotagiri        Coonoor
```

### Algorithm Steps
1. Initialize all distances to infinity, except start (0)
2. Create a set of unvisited nodes
3. For current node, check all neighbors
4. Update distance if shorter path found
5. Mark current node as visited
6. Repeat until destination reached
7. Reconstruct path using previous node tracking

### Time Complexity
- **O(V²)** where V is number of vertices
- Can be optimized to O(E log V) with priority queue

### Usage
```javascript
import { dijkstra, getGraphData } from './dijkstra.js';

const { graph, locationMap } = getGraphData();
const result = dijkstra(graph, 'coimbatore', 'ooty');

// Result:
// {
//   distance: 86,
//   path: ['coimbatore', 'metupalayam', 'ooty'],
//   found: true
// }
```

### Available Locations in Demo Graph
- Coimbatore
- Metupalayam
- Ooty
- Kotagiri
- Coonoor
- Palani
- Dindigul
- Madurai
- Tiruppur
- Erode
- Salem
- Bangalore
- Mysore
- Tirunelveli



