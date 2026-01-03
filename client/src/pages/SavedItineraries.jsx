import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, MapPin as MapPinIcon, Filter } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TripCard from '../components/TripCard';
import Button from '../components/Button';
import EmptyState from '../components/EmptyState';
import { useAuth } from '../context/AuthContext';
import { mockAPI } from '../utils/mockAPI';

const SavedItineraries = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchTrips = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }
      const response = await mockAPI.getTrips(user.id);
      if (response.success) {
        setTrips(response.trips);
      }
      setLoading(false);
    };

    if (user) {
      fetchTrips();
    }
  }, [user]);

  const handleDelete = async (tripId) => {
    if (window.confirm('Are you sure you want to delete this trip?')) {
      const response = await mockAPI.deleteTrip(tripId);
      if (response.success) {
        setTrips(trips.filter((trip) => trip.id !== tripId));
      }
    }
  };

  const filteredTrips = trips.filter((trip) => {
    if (filter === 'all') return true;
    return trip.status === filter;
  });

  const filterOptions = [
    { value: 'all', label: 'All Trips' },
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'completed', label: 'Completed' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-grow py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                My Trips
              </h1>
              <p className="text-gray-600">
                Manage all your saved travel itineraries
              </p>
            </div>
            <Button
              onClick={() => navigate('/plan-trip')}
              variant="primary"
              size="lg"
            >
              <Plus className="w-5 h-5 mr-2 inline" />
              New Trip
            </Button>
          </div>

          <div className="mb-6 flex items-center space-x-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <div className="flex space-x-2">
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFilter(option.value)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                    filter === option.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
              <p className="mt-4 text-gray-600">Loading trips...</p>
            </div>
          ) : filteredTrips.length > 0 ? (
            <div>
              <div className="mb-4 text-sm text-gray-600">
                Showing {filteredTrips.length} of {trips.length} trips
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTrips.map((trip) => (
                  <TripCard
                    key={trip.id}
                    trip={trip}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            </div>
          ) : (
            <EmptyState
              icon={MapPinIcon}
              title={filter === 'all' ? 'No trips yet' : `No ${filter} trips found`}
              description={
                filter === 'all'
                  ? 'Start planning your first journey today!'
                  : 'Try adjusting your filter or create a new trip.'
              }
              actionLabel="Plan a Trip"
              onAction={() => navigate('/plan-trip')}
            />
          )}

          <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-8 text-white">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-bold mb-4">
                Travel Tips for Better Planning
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-start">
                  <div className="bg-white bg-opacity-20 rounded-full p-2 mr-3">
                    <MapPinIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Plan Ahead</h3>
                    <p className="text-blue-100">
                      Book your trips early to get the best deals and
                      availability.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-white bg-opacity-20 rounded-full p-2 mr-3">
                    <MapPinIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Stay Flexible</h3>
                    <p className="text-blue-100">
                      Consider alternative routes and times for better traffic
                      conditions.
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

export default SavedItineraries;
