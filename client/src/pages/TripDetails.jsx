import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Calendar,
  Clock,
  Navigation,
  DollarSign,
  MapPin,
  Edit,
  Trash2,
  Zap,
  AlertCircle,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import ProcessingModal from '../components/ProcessingModal';
import { mockAPI } from '../utils/mockAPI';
import { getMultipleRoutes, geocodeAddress } from '../utils/googleMaps';
import { useJsApiLoader } from '@react-google-maps/api';
import { formatINR } from '../utils/currency.js';

const TripDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const { isLoaded: mapsLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey || '',
    libraries: ['places', 'directions', 'geocoding'],
  });
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [optimizing, setOptimizing] = useState(false);
  const [optimizedData, setOptimizedData] = useState(null);
  const [optimizationError, setOptimizationError] = useState('');
  const [googleRouteData, setGoogleRouteData] = useState(null);
  const [useGoogle, setUseGoogle] = useState(true);

  useEffect(() => {
    const fetchTrip = async () => {
      const response = await mockAPI.getTripById(id);
      if (response.success) {
        setTrip(response.trip);
      }
      setLoading(false);
    };

    fetchTrip();
  }, [id]);

  const handleOptimizeRoute = async () => {
    if (!mapsLoaded || !window.google) {
      setOptimizationError('Google Maps not loaded. Please wait...');
      return;
    }

    setOptimizing(true);
    setOptimizationError('');
    setOptimizedData(null);
    setGoogleRouteData(null);

    try {
      if (useGoogle) {
        try {
          const sourceGeo = await geocodeAddress(trip.source);
          const destGeo = await geocodeAddress(trip.destination);
          
          const googleRoutesResult = await getMultipleRoutes(
            sourceGeo.address,
            destGeo.address,
            trip.transportMode
          );

          if (googleRoutesResult?.success && googleRoutesResult.routes?.length > 0) {
            const fastestRoute = googleRoutesResult.routes.reduce((best, route) => {
              if (!best || (route.durationValue < best.durationValue && route.durationValue > 0)) {
                return route;
              }
              return best;
            }, null);

            if (fastestRoute) {
              setGoogleRouteData({
                distance: fastestRoute.distance,
                duration: fastestRoute.duration,
                eta: fastestRoute.eta,
                fuelCost: fastestRoute.fuelCost,
                tollCost: fastestRoute.tollCost,
                algorithm: fastestRoute.algorithm,
              });
            }
          }
        } catch (error) {
          console.error('Google Maps route error:', error);
        }
      }

      const dijkstraResponse = await mockAPI.optimizeRoute({
        source: trip.source,
        destination: trip.destination,
        transportMode: trip.transportMode,
      });

      if (dijkstraResponse.success) {
        const route = dijkstraResponse.optimizedRoute;
        setOptimizedData({
          ...route,
          algorithm: 'Dijkstra (Shortest Path)',
          fuelCost: typeof route.fuelCost === 'number' ? formatINR(route.fuelCost) : route.fuelCost,
          tollCost: typeof route.tollCost === 'number' ? formatINR(route.tollCost) : route.tollCost,
        });
      }
    } catch (error) {
      setOptimizationError(error.message || 'Failed to optimize route');
    }

    setOptimizing(false);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this trip?')) {
      const response = await mockAPI.deleteTrip(trip.id);
      if (response.success) {
        navigate('/saved-itineraries');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Loading trip details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">Trip not found</p>
            <Button onClick={() => navigate('/saved-itineraries')} variant="primary">
              Back to Trips
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <ProcessingModal
        isOpen={optimizing}
        message="Calculating optimal route..."
        description="Finding the best path considering traffic and conditions"
      />

      <main className="flex-grow">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6 flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {trip.title}
              </h1>
              <div className="flex items-center text-gray-600 space-x-4">
                <span className="text-lg">{trip.source}</span>
                <ArrowRight className="w-5 h-5" />
                <span className="text-lg">{trip.destination}</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={() => {
                  navigate(`/map-view/${trip.id}`);
                }}
                variant="primary"
              >
                View on Map
              </Button>
              <Button onClick={handleDelete} variant="danger">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Trip Information
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-6">
                  <div className="flex items-start">
                    <div className="bg-blue-100 rounded-lg p-3 mr-4">
                      <Calendar className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Date</p>
                      <p className="font-semibold text-gray-900">{trip.date}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-green-100 rounded-lg p-3 mr-4">
                      <Clock className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Departure</p>
                      <p className="font-semibold text-gray-900">{trip.time}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-orange-100 rounded-lg p-3 mr-4">
                      <Navigation className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Distance</p>
                      <p className="font-semibold text-gray-900">
                        {trip.distance}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Route Summary
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                        <MapPin className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Start Point</p>
                        <p className="font-semibold text-gray-900">
                          {trip.source}
                        </p>
                      </div>
                    </div>

                    <div className="ml-4 h-8 border-l-2 border-blue-300"></div>

                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                        <MapPin className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Destination</p>
                        <p className="font-semibold text-gray-900">
                          {trip.destination}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {optimizationError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start">
                  <AlertCircle className="w-5 h-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-red-800 font-semibold">Optimization Failed</p>
                    <p className="text-red-700 text-sm mt-1">{optimizationError}</p>
                  </div>
                </div>
              )}

              {googleRouteData && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                  <div className="flex items-start mb-4">
                    <Zap className="w-6 h-6 text-blue-600 mr-3 mt-0.5" />
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-blue-900">
                        Google Maps Route
                      </h3>
                      <p className="text-blue-700 text-sm mt-1">
                        {googleRouteData.algorithm}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <div className="bg-white rounded p-3">
                      <p className="text-xs text-gray-600 mb-1">Distance</p>
                      <p className="text-lg font-bold text-gray-900">
                        {googleRouteData.distance || 'N/A'}
                      </p>
                    </div>
                    <div className="bg-white rounded p-3">
                      <p className="text-xs text-gray-600 mb-1">Duration</p>
                      <p className="text-lg font-bold text-gray-900">
                        {googleRouteData.duration || 'N/A'}
                      </p>
                    </div>
                    <div className="bg-white rounded p-3">
                      <p className="text-xs text-gray-600 mb-1">ETA</p>
                      <p className="text-lg font-bold text-gray-900">
                        {googleRouteData.eta || 'N/A'}
                      </p>
                    </div>
                    <div className="bg-white rounded p-3">
                      <p className="text-xs text-gray-600 mb-1">Fuel Cost</p>
                      <p className="text-lg font-bold text-gray-900">
                        {googleRouteData.fuelCost || 'N/A'}
                      </p>
                    </div>
                  </div>

                  {googleRouteData.tollCost && (
                    <div className="mt-4 text-sm text-gray-700">
                      <strong>Toll Cost:</strong> {googleRouteData.tollCost}
                    </div>
                  )}
                </div>
              )}

              {optimizedData && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                  <div className="flex items-start mb-4">
                    <Zap className="w-6 h-6 text-green-600 mr-3 mt-0.5" />
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-green-900">
                        Dijkstra Algorithm Route
                      </h3>
                      <p className="text-green-700 text-sm mt-1">
                        {optimizedData.algorithm}
                      </p>
                    </div>
                  </div>

                  {optimizedData.optimizedPath && optimizedData.optimizedPath.length > 0 && (
                    <div className="mb-6 bg-white rounded-lg p-4">
                      <p className="text-sm font-semibold text-gray-700 mb-3">Optimized Path:</p>
                      <div className="flex flex-wrap items-center gap-2">
                        {optimizedData.optimizedPath.map((location, index) => (
                          <div key={index} className="flex items-center">
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium">
                              {location}
                            </span>
                            {index < optimizedData.optimizedPath.length - 1 && (
                              <ArrowRight className="w-4 h-4 text-gray-400 mx-2" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <div className="bg-white rounded p-3">
                      <p className="text-xs text-gray-600 mb-1">Distance</p>
                      <p className="text-lg font-bold text-gray-900">
                        {optimizedData.distance || 'N/A'}
                      </p>
                    </div>
                    <div className="bg-white rounded p-3">
                      <p className="text-xs text-gray-600 mb-1">Duration</p>
                      <p className="text-lg font-bold text-gray-900">
                        {optimizedData.duration || 'N/A'}
                      </p>
                    </div>
                    <div className="bg-white rounded p-3">
                      <p className="text-xs text-gray-600 mb-1">ETA</p>
                      <p className="text-lg font-bold text-gray-900">
                        {optimizedData.eta || 'N/A'}
                      </p>
                    </div>
                    <div className="bg-white rounded p-3">
                      <p className="text-xs text-gray-600 mb-1">Fuel Cost</p>
                      <p className="text-lg font-bold text-gray-900">
                        {optimizedData.fuelCost || 'N/A'}
                      </p>
                    </div>
                  </div>

                  {optimizedData.tollCost && (
                    <div className="mt-4 text-sm text-gray-700">
                      <strong>Toll Cost:</strong> {optimizedData.tollCost}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Trip Status
                </h3>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Status</p>
                    <span
                      className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                        trip.status === 'upcoming'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {trip.status === 'upcoming'
                        ? 'Upcoming'
                        : 'Completed'}
                    </span>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-1">Created On</p>
                    <p className="font-semibold text-gray-900">
                      {trip.createdAt}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-1">Transport Mode</p>
                    <p className="font-semibold text-gray-900 capitalize">
                      {trip.transportMode}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-1">Estimated Duration</p>
                    <p className="font-semibold text-gray-900">
                      {trip.duration}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg shadow-md p-6 text-white">
                <h3 className="text-lg font-bold mb-4">Route Optimization</h3>
                <div className="mb-4">
                  <label className="flex items-center space-x-2 cursor-pointer mb-2">
                    <input
                      type="checkbox"
                      checked={useGoogle}
                      onChange={(e) => setUseGoogle(e.target.checked)}
                      className="w-4 h-4 rounded focus:ring-2 focus:ring-white"
                    />
                    <span className="text-sm text-blue-100">Use Google Maps (Traffic-aware)</span>
                  </label>
                  <p className="text-xs text-blue-200 ml-6">
                    {useGoogle 
                      ? 'Will calculate both Google Maps and Dijkstra routes'
                      : 'Will calculate only Dijkstra algorithm route'}
                  </p>
                </div>
                {!optimizedData && !googleRouteData ? (
                  <p className="text-sm text-blue-100 mb-6">
                    Click the button below to calculate the optimal route.
                  </p>
                ) : (
                  <p className="text-sm text-blue-100 mb-6">
                    Recalculate the route to get updated optimization results.
                  </p>
                )}
                <Button
                  onClick={handleOptimizeRoute}
                  variant="secondary"
                  size="lg"
                  fullWidth
                  disabled={optimizing}
                  className="bg-white text-blue-600 hover:bg-blue-50"
                >
                  <Zap className="w-4 h-4 mr-2 inline" />
                  {optimizing ? 'Optimizing...' : optimizedData || googleRouteData ? 'Re-optimize Route' : 'Optimize Route'}
                </Button>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  <Button
                    onClick={() => navigate('/recommendations')}
                    variant="outline"
                    size="lg"
                    fullWidth
                  >
                    View Recommendations
                  </Button>
                  <Button
                    onClick={() => navigate('/saved-itineraries')}
                    variant="secondary"
                    size="lg"
                    fullWidth
                  >
                    Back to Trips
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TripDetails;
