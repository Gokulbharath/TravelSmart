import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Navigation,
  Clock,
  MapPin,
  DollarSign,
  AlertTriangle,
  TrendingUp,
  Zap,
  Award,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import MapContainer from '../components/GoogleMap';
import { mockAPI } from '../utils/mockAPI';
import { geocodeAddress, getMultipleRoutes } from '../utils/googleMaps';
import { convertUSDToINR, formatINR } from '../utils/currency.js';
import { useJsApiLoader } from '@react-google-maps/api';

const MapView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const { isLoaded: mapsLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey || '',
    libraries: ['places', 'directions', 'geocoding'],
  });
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [routesLoading, setRoutesLoading] = useState(false);
  const [showTraffic, setShowTraffic] = useState(false);
  const [mapCenter, setMapCenter] = useState({ lat: 20.5937, lng: 78.9629 });
  const [markers, setMarkers] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [selectedRouteId, setSelectedRouteId] = useState(null);
  const [bestRoutes, setBestRoutes] = useState({
    fastest: null,
    shortest: null,
    cheapest: null,
  });

  useEffect(() => {
    const fetchTrip = async () => {
      const response = await mockAPI.getTripById(id);
      if (response.success && response.trip) {
        setTrip(response.trip);
      }
      setLoading(false);
    };

    fetchTrip();
  }, [id]);

  useEffect(() => {
    if (trip && mapsLoaded && window.google) {
      loadGeocodesAndRoutes();
    }
  }, [trip, mapsLoaded]);

  const loadGeocodesAndRoutes = async () => {
    if (!trip) return;

    try {
      const sourceGeo = await geocodeAddress(trip.source);
      const destGeo = await geocodeAddress(trip.destination);
      
      const newMarkers = [
        {
          position: { lat: sourceGeo.lat, lng: sourceGeo.lng },
          label: 'S',
          title: trip.source,
        },
        {
          position: { lat: destGeo.lat, lng: destGeo.lng },
          label: 'D',
          title: trip.destination,
        },
      ];
      
      setMarkers(newMarkers);
      
      const centerLat = (sourceGeo.lat + destGeo.lat) / 2;
      const centerLng = (sourceGeo.lng + destGeo.lng) / 2;
      setMapCenter({ lat: centerLat, lng: centerLng });

      await loadAllRoutes(sourceGeo.address, destGeo.address);
    } catch (error) {
      console.error('Error loading geocodes:', error);
    }
  };

  const loadAllRoutes = async (sourceAddress, destAddress) => {
    if (!trip || !mapsLoaded || !window.google) return;

    setRoutesLoading(true);
    try {
      const [googleRoutesResult, dijkstraResult] = await Promise.all([
        getMultipleRoutes(sourceAddress, destAddress, trip.transportMode).catch(() => null),
        mockAPI.optimizeRoute({
          source: trip.source,
          destination: trip.destination,
          transportMode: trip.transportMode,
        }).catch(() => null),
      ]);

      const allRoutes = [];

      if (googleRoutesResult?.success && googleRoutesResult.routes && googleRoutesResult.routes.length > 0) {
        googleRoutesResult.routes.forEach((route) => {
          if (route && route.polylinePath && route.polylinePath.length > 0) {
            allRoutes.push(route);
          }
        });
      }

      if (dijkstraResult?.success && dijkstraResult.optimizedRoute) {
        const dijkstraData = dijkstraResult.optimizedRoute;
        const distanceKm = parseFloat(dijkstraData.distance?.replace(/[^\d.]/g, '')) || 0;
        const distanceMeters = distanceKm * 1000;
        
        const fuelCostINR = typeof dijkstraData.fuelCost === 'number' 
          ? dijkstraData.fuelCost 
          : convertUSDToINR((distanceKm / 100) * 10 * 1.2);
        const tollCostINR = typeof dijkstraData.tollCost === 'number'
          ? dijkstraData.tollCost
          : convertUSDToINR(distanceKm * 0.05);
        const totalCostINR = fuelCostINR + tollCostINR;

        let dijkstraPolylinePath = [];
        if (dijkstraData.optimizedPath && Array.isArray(dijkstraData.optimizedPath) && dijkstraData.optimizedPath.length > 0) {
          try {
            const pathPromises = dijkstraData.optimizedPath.map((loc) => geocodeAddress(loc));
            const pathResults = await Promise.allSettled(pathPromises);
            dijkstraPolylinePath = pathResults
              .filter((result) => result.status === 'fulfilled' && result.value)
              .map((result) => ({
                lat: result.value.lat,
                lng: result.value.lng,
              }))
              .filter((coord) => coord.lat && coord.lng);
          } catch (error) {
            console.error('Error geocoding Dijkstra path:', error);
          }
        }

        const dijkstraRouteObj = {
          id: 'dijkstra-route',
          distance: dijkstraData.distance || 'N/A',
          distanceValue: distanceMeters,
          duration: dijkstraData.duration || 'N/A',
          durationValue: parseFloat(dijkstraData.duration?.replace(/[^\d.]/g, '')) * 60 || 0,
          eta: dijkstraData.eta || 'N/A',
          fuelCost: formatINR(fuelCostINR),
          tollCost: formatINR(tollCostINR),
          totalCost: totalCostINR,
          polylinePath: dijkstraPolylinePath,
          summary: 'Dijkstra Algorithm',
          algorithm: 'Dijkstra (Shortest Path)',
          type: 'Dijkstra',
          warnings: [],
        };

        allRoutes.push(dijkstraRouteObj);
      }

      setRoutes(allRoutes);
      
      if (allRoutes.length > 0) {
        calculateBestRoutes(allRoutes);
        setSelectedRouteId(allRoutes[0].id);
      }
    } catch (error) {
      console.error('Error loading routes:', error);
    } finally {
      setRoutesLoading(false);
    }
  };

  const calculateBestRoutes = (allRoutes) => {
    let fastest = null;
    let shortest = null;
    let cheapest = null;

    allRoutes.forEach((route) => {
      if (route.durationValue !== undefined && route.durationValue > 0) {
        if (!fastest || route.durationValue < fastest.durationValue) {
          fastest = route;
        }
      }

      if (route.distanceValue !== undefined && route.distanceValue > 0) {
        if (!shortest || route.distanceValue < shortest.distanceValue) {
          shortest = route;
        }
      }

      if (route.totalCost !== undefined && route.totalCost > 0) {
        if (!cheapest || route.totalCost < cheapest.totalCost) {
          cheapest = route;
        }
      }
    });

    setBestRoutes({ fastest, shortest, cheapest });
  };

  const getRouteBadges = (route) => {
    const badges = [];
    if (route.id === bestRoutes.fastest?.id) {
      badges.push({ label: 'Fastest', color: 'bg-green-100 text-green-800' });
    }
    if (route.id === bestRoutes.shortest?.id) {
      badges.push({ label: 'Shortest', color: 'bg-blue-100 text-blue-800' });
    }
    if (route.id === bestRoutes.cheapest?.id) {
      badges.push({ label: 'Cheapest', color: 'bg-orange-100 text-orange-800' });
    }
    return badges;
  };

  const polylinePaths = useMemo(() => {
    if (!routes || routes.length === 0) return [];
    return routes
      .filter((route) => route && route.polylinePath && route.polylinePath.length > 0)
      .map((route) => ({
        id: route.id,
        polylinePath: route.polylinePath,
        path: route.polylinePath,
      }));
  }, [routes]);

  if (loading || !mapsLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Loading map...</p>
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
            <p className="text-gray-600">Trip not found</p>
            <Button
              onClick={() => navigate('/dashboard')}
              variant="primary"
              className="mt-4"
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {trip.title}
              </h1>
              <p className="text-gray-600">
                {trip.source} → {trip.destination}
              </p>
            </div>
            <Button
              onClick={() => navigate(`/trip/${id}`)}
              variant="outline"
            >
              Back to Trip Details
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-96 lg:h-[600px] relative">
                  <MapContainer
                    center={mapCenter}
                    markers={markers}
                    polylinePaths={polylinePaths}
                    showTraffic={showTraffic}
                    selectedRouteId={selectedRouteId}
                    zoom={routes.length > 0 ? 8 : 6}
                  />
                </div>

                <div className="p-4 bg-white border-t flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showTraffic}
                        onChange={(e) => setShowTraffic(e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        Show Traffic
                      </span>
                    </label>
                  </div>
                  <Button
                    onClick={() => loadAllRoutes(trip.source, trip.destination)}
                    variant="outline"
                    size="sm"
                    disabled={routesLoading || !mapsLoaded}
                  >
                    {routesLoading ? 'Loading...' : 'Refresh Routes'}
                  </Button>
                </div>
              </div>

              {routesLoading && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
                    <span className="ml-3 text-gray-600">Calculating routes...</span>
                  </div>
                </div>
              )}

              {!routesLoading && routes && routes.length > 0 && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <Navigation className="w-5 h-5 mr-2" />
                    Available Routes ({routes.length})
                  </h2>
                  <div className="space-y-3">
                    {routes.map((route) => {
                      const badges = getRouteBadges(route);
                      const isSelected = selectedRouteId === route.id;
                      
                      return (
                        <div
                          key={route.id}
                          onClick={() => setSelectedRouteId(route.id)}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            isSelected
                              ? 'border-blue-600 bg-blue-50'
                              : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h3 className="font-semibold text-gray-900">{route.summary}</h3>
                                <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                                  {route.type}
                                </span>
                                {badges.map((badge, idx) => (
                                  <span
                                    key={idx}
                                    className={`text-xs px-2 py-1 rounded font-medium ${badge.color}`}
                                  >
                                    {badge.label}
                                  </span>
                                ))}
                              </div>
                              <div className="grid grid-cols-3 gap-4 text-sm">
                                <div>
                                  <p className="text-gray-600">Distance</p>
                                  <p className="font-bold text-gray-900">{route.distance}</p>
                                </div>
                                <div>
                                  <p className="text-gray-600">Duration</p>
                                  <p className="font-bold text-gray-900">{route.duration}</p>
                                </div>
                                <div>
                                  <p className="text-gray-600">Total Cost</p>
                                  <p className="font-bold text-gray-900">
                                    {typeof route.totalCost === 'number' ? formatINR(route.totalCost) : route.totalCost || 'N/A'}
                                  </p>
                                </div>
                              </div>
                            </div>
                            {isSelected && (
                              <Award className="w-5 h-5 text-blue-600 flex-shrink-0 ml-2" />
                            )}
                          </div>
                          <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                            <span>Fuel: {route.fuelCost}</span>
                            <span>Toll: {route.tollCost}</span>
                            <span>ETA: {route.eta}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Best Routes
                </h3>
                <div className="space-y-3">
                  {bestRoutes.fastest && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center mb-1">
                        <Zap className="w-4 h-4 text-green-600 mr-2" />
                        <span className="text-sm font-semibold text-green-900">Fastest</span>
                      </div>
                      <p className="text-xs text-green-700">{bestRoutes.fastest.summary}</p>
                      <p className="text-xs text-green-600 mt-1">{bestRoutes.fastest.duration}</p>
                    </div>
                  )}
                  {bestRoutes.shortest && (
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center mb-1">
                        <MapPin className="w-4 h-4 text-blue-600 mr-2" />
                        <span className="text-sm font-semibold text-blue-900">Shortest</span>
                      </div>
                      <p className="text-xs text-blue-700">{bestRoutes.shortest.summary}</p>
                      <p className="text-xs text-blue-600 mt-1">{bestRoutes.shortest.distance}</p>
                    </div>
                  )}
                  {bestRoutes.cheapest && (
                    <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                      <div className="flex items-center mb-1">
                        <DollarSign className="w-4 h-4 text-orange-600 mr-2" />
                        <span className="text-sm font-semibold text-orange-900">Cheapest</span>
                      </div>
                      <p className="text-xs text-orange-700">{bestRoutes.cheapest.summary}</p>
                      <p className="text-xs text-orange-600 mt-1">
                        {typeof bestRoutes.cheapest.totalCost === 'number' ? formatINR(bestRoutes.cheapest.totalCost) : bestRoutes.cheapest.totalCost}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Trip Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Departure</p>
                    <p className="font-semibold text-gray-900">
                      {trip.date} at {trip.time}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Transport Mode</p>
                    <p className="font-semibold text-gray-900 capitalize">
                      {trip.transportMode}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        trip.status === 'upcoming'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {trip.status}
                    </span>
                  </div>
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

export default MapView;
