# Google Maps Integration Setup

## Environment Variables

Create a `.env` file in the `client` directory with:

```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

## Google Cloud Console Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the following APIs:
   - Maps JavaScript API
   - Places API
   - Directions API
   - Geocoding API
4. Create credentials (API Key)
5. Restrict API key (recommended):
   - Application restrictions: HTTP referrers
   - Add your domain: `localhost:5174/*`, `localhost:5173/*`
   - API restrictions: Select only the APIs listed above

## Features

- ✅ Interactive Google Maps
- ✅ Places Autocomplete for source/destination
- ✅ Real-time traffic-aware routing
- ✅ Polyline route visualization
- ✅ Traffic layer toggle
- ✅ Marker for source and destination
- ✅ Integration with existing Dijkstra algorithm

## Usage

1. Set up `.env` file with your Google Maps API key
2. Restart development server
3. Use Places Autocomplete in PlanTrip page
4. View interactive map in MapView page
5. Compare Google Maps and Dijkstra routes in TripDetails

