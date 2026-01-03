# Example API Responses

## Route Optimization Examples

### Example 1: Coimbatore to Ooty
**Request:**
```json
POST /api/routes/optimize
{
  "source": "Coimbatore",
  "destination": "Ooty",
  "transportMode": "car"
}
```

**Response:**
```json
{
  "success": true,
  "optimizedRoute": {
    "distance": "86 km",
    "duration": "1h 26m",
    "eta": "11:30 AM",
    "fuelCost": "$10.32",
    "tollCost": "$2",
    "optimizedPath": ["Coimbatore", "Metupalayam", "Ooty"],
    "algorithm": "Dijkstra",
    "totalDistance": 86
  },
  "message": "Route optimized successfully using Dijkstra algorithm"
}
```

---

### Example 2: Coimbatore to Bangalore
**Request:**
```json
POST /api/routes/optimize
{
  "source": "Coimbatore",
  "destination": "Bangalore",
  "transportMode": "car"
}
```

**Response:**
```json
{
  "success": true,
  "optimizedRoute": {
    "distance": "447 km",
    "duration": "7h 27m",
    "eta": "05:30 PM",
    "fuelCost": "$53.64",
    "tollCost": "$18",
    "optimizedPath": ["Coimbatore", "Tiruppur", "Erode", "Salem", "Bangalore"],
    "algorithm": "Dijkstra",
    "totalDistance": 447
  },
  "message": "Route optimized successfully using Dijkstra algorithm"
}
```

---

### Example 3: Invalid Location
**Request:**
```json
POST /api/routes/optimize
{
  "source": "InvalidCity",
  "destination": "Ooty",
  "transportMode": "car"
}
```

**Response:**
```json
{
  "success": false,
  "message": "Source location \"InvalidCity\" not found in route network",
  "optimizedRoute": null
}
```

---

### Example 4: No Route Found
**Request:**
```json
POST /api/routes/optimize
{
  "source": "Coimbatore",
  "destination": "UnconnectedCity",
  "transportMode": "car"
}
```

**Response:**
```json
{
  "success": false,
  "message": "No route found between source and destination",
  "optimizedRoute": null
}
```

---

## Transport Mode Examples

### Car Mode (60 km/h)
```
Distance: 86 km
Duration: 1h 26m
```

### Train Mode (80 km/h)
```
Distance: 86 km
Duration: 1h 5m
```

### Bus Mode (50 km/h)
```
Distance: 86 km
Duration: 1h 43m
```

### Walk Mode (5 km/h)
```
Distance: 86 km
Duration: 17h 12m
```

