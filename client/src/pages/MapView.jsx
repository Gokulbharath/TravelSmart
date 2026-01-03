import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Navigation,
  Clock,
  MapPin,
  DollarSign,
  AlertTriangle,
  TrendingUp,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { mockAPI } from '../utils/mockAPI';

const MapView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTraffic, setShowTraffic] = useState(false);

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

  if (loading) {
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
              onClick={() => navigate('/recommendations')}
              variant="primary"
            >
              View Recommendations
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-96 lg:h-[600px] relative bg-gray-200 flex items-center justify-center">
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-30"
                    style={{
                      backgroundImage:
                        'url(https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1600)',
                    }}
                  ></div>
                  <div className="relative z-10 text-center p-8">
                    <MapPin className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Interactive Map Placeholder
                    </h3>
                    <p className="text-gray-600 mb-4">
                      This is where the interactive map will be displayed in
                      production.
                    </p>
                    <div className="bg-white rounded-lg shadow-lg p-6 inline-block">
                      <p className="text-sm text-gray-700 mb-2">
                        Map Integration Options:
                      </p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Google Maps API</li>
                        <li>• Mapbox GL JS</li>
                        <li>• Leaflet with OpenStreetMap</li>
                      </ul>
                    </div>
                  </div>
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
                    {showTraffic && (
                      <span className="text-xs text-green-600 font-semibold">
                        Traffic layer enabled
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Navigation className="w-4 h-4" />
                    <span>Route Preview</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Route Details
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-blue-100 rounded-lg p-2 mr-3">
                      <Navigation className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Distance</p>
                      <p className="text-lg font-bold text-gray-900">
                        {trip.distance}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-green-100 rounded-lg p-2 mr-3">
                      <Clock className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Duration</p>
                      <p className="text-lg font-bold text-gray-900">
                        {trip.duration}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-orange-100 rounded-lg p-2 mr-3">
                      <DollarSign className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Estimated Cost</p>
                      <p className="text-lg font-bold text-gray-900">$45</p>
                    </div>
                  </div>
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

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-semibold text-yellow-800 mb-1">
                      Traffic Alert
                    </p>
                    <p className="text-yellow-700">
                      Moderate traffic expected. Consider leaving 15 minutes
                      earlier.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                  <TrendingUp className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-semibold text-blue-800 mb-1">
                      Route Optimization
                    </p>
                    <p className="text-blue-700">
                      This route is optimized based on current traffic
                      conditions and weather.
                    </p>
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
