# Testing Backend Routes

## Current Routes Registered

All routes are POST methods:

1. `/api/routes/optimize` - Dijkstra algorithm
2. `/api/routes/route-data` - Route data for maps
3. `/api/routes/google-directions` - Single Google route
4. `/api/routes/google-multiple-routes` - Multiple Google routes
5. `/api/routes/geocode` - Geocode address

## To Fix 404 Error:

**The server MUST be restarted to load new routes!**

### Steps:
1. Stop the current server (Ctrl+C in the terminal where it's running)
2. Restart:
   ```bash
   cd server
   npm start
   ```

### Verify Routes Work:

Test with Postman or curl:

```bash
# Test geocode endpoint
curl -X POST http://localhost:5000/api/routes/geocode \
  -H "Content-Type: application/json" \
  -d "{\"address\":\"Coimbatore\"}"

# Test Google Directions
curl -X POST http://localhost:5000/api/routes/google-directions \
  -H "Content-Type: application/json" \
  -d "{\"source\":\"Coimbatore\",\"destination\":\"Bangalore\",\"transportMode\":\"car\"}"
```

