import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapPin,
  Calendar,
  Clock,
  Car,
  Train,
  Bus,
  Footprints,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import ProcessingModal from '../components/ProcessingModal';
import PlacesAutocomplete from '../components/PlacesAutocomplete';
import { useAuth } from '../context/AuthContext';
import { mockAPI } from '../utils/mockAPI';

const PlanTrip = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    source: '',
    destination: '',
    date: '',
    time: '',
    transportMode: 'car',
  });

  const transportModes = [
    { value: 'car', label: 'Car', icon: <Car className="w-5 h-5" /> },
    { value: 'train', label: 'Train', icon: <Train className="w-5 h-5" /> },
    { value: 'bus', label: 'Bus', icon: <Bus className="w-5 h-5" /> },
    { value: 'walk', label: 'Walk', icon: <Footprints className="w-5 h-5" /> },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    if (!user?.id) {
      setError('Please login to create a trip');
      setLoading(false);
      return;
    }

    const response = await mockAPI.createTrip({
      ...formData,
      userId: user.id,
    });

    setLoading(false);

    if (response.success) {
      setSuccess(true);
      setTimeout(() => {
        navigate('/saved-itineraries');
      }, 1500);
    } else {
      setError(response.message || 'Failed to create trip');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <ProcessingModal
        isOpen={loading}
        message="Creating your trip..."
        description="We're processing your travel details"
      />

      <main className="flex-grow py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Plan Your Trip
            </h1>
            <p className="text-gray-600">
              Enter your travel details and let us optimize your journey
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
              <AlertCircle className="w-5 h-5 text-red-600 mr-2 mt-0.5" />
              <span className="text-sm text-red-600">{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start">
              <Sparkles className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
              <div>
                <p className="text-green-800 font-semibold">
                  Trip created successfully!
                </p>
                <p className="text-green-700 text-sm">
                  Redirecting to your trips...
                </p>
              </div>
            </div>
          )}

          <div className="bg-white rounded-lg shadow-md p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Trip Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Weekend Getaway to Paris"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Source Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10 pointer-events-none" />
                    <PlacesAutocomplete
                      name="source"
                      value={formData.source}
                      onChange={handleChange}
                      placeholder="Starting point"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Destination Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-600 z-10 pointer-events-none" />
                    <PlacesAutocomplete
                      name="destination"
                      value={formData.destination}
                      onChange={handleChange}
                      placeholder="Where to?"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Travel Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Departure Time
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Transport Mode
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {transportModes.map((mode) => (
                    <label
                      key={mode.value}
                      className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.transportMode === mode.value
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-300 hover:border-blue-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="transportMode"
                        value={mode.value}
                        checked={formData.transportMode === mode.value}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div
                        className={`mb-2 ${
                          formData.transportMode === mode.value
                            ? 'text-blue-600'
                            : 'text-gray-600'
                        }`}
                      >
                        {mode.icon}
                      </div>
                      <span
                        className={`text-sm font-medium ${
                          formData.transportMode === mode.value
                            ? 'text-blue-600'
                            : 'text-gray-700'
                        }`}
                      >
                        {mode.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start">
                <AlertCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-800">
                  <p className="font-semibold mb-1">Route Optimization</p>
                  <p>
                    After creating your trip, you can optimize the route using Dijkstra's algorithm
                    to find the shortest path between your source and destination.
                  </p>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  disabled={loading}
                >
                  {loading ? 'Creating Trip...' : 'Create Trip'}
                </Button>
                <Button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  variant="secondary"
                  size="lg"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PlanTrip;
