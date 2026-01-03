import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Plus, TrendingUp, MapPin as MapPinIcon, Calendar } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TripCard from '../components/TripCard';
import Button from '../components/Button';
import EmptyState from '../components/EmptyState';
import { mockAPI } from '../utils/mockAPI';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [allTrips, setAllTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }
      const response = await mockAPI.getTrips(user.id);
      if (response.success) {
        setAllTrips(response.trips);
        setTrips(response.trips.slice(0, 3));
      }
      setLoading(false);
    };

    if (user) {
      fetchTrips();
    }
  }, [user]);

  const calculateStats = () => {
    if (!allTrips || allTrips.length === 0) {
      return {
        totalTrips: 0,
        upcomingTrips: 0,
        distanceTraveled: 0,
      };
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const totalTrips = allTrips.length;

    const upcomingTrips = allTrips.filter((trip) => {
      if (!trip.date) return false;
      const tripDate = new Date(trip.date);
      tripDate.setHours(0, 0, 0, 0);
      return tripDate >= today && trip.status === 'upcoming';
    }).length;

    const distanceTraveled = allTrips.reduce((total, trip) => {
      if (trip.distance && trip.distance.trim() !== '') {
        const distanceStr = trip.distance.toString().replace(/[^\d.]/g, '');
        const distanceNum = parseFloat(distanceStr);
        if (!isNaN(distanceNum) && distanceNum > 0) {
          return total + distanceNum;
        }
      }
      if (trip.totalDistance && typeof trip.totalDistance === 'number') {
        return total + trip.totalDistance;
      }
      return total;
    }, 0);

    return {
      totalTrips,
      upcomingTrips,
      distanceTraveled: Math.round(distanceTraveled),
    };
  };

  const statsData = calculateStats();

  const formatDistance = (distance) => {
    if (distance === 0) return '0 km';
    if (distance >= 1000) {
      return `${(distance / 1000).toFixed(1)}k km`;
    }
    return `${distance.toLocaleString()} km`;
  };

  const stats = [
    {
      icon: <MapPinIcon className="w-6 h-6" />,
      label: 'Total Trips',
      value: statsData.totalTrips.toString(),
      color: 'blue',
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      label: 'Upcoming',
      value: statsData.upcomingTrips.toString(),
      color: 'green',
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      label: 'Distance Traveled',
      value: formatDistance(statsData.distanceTraveled),
      color: 'orange',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <div
          className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16"
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=1600)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: 'overlay',
            backgroundColor: 'rgba(37, 99, 235, 0.85)',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold mb-2">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-xl text-blue-100 mb-6">
              Ready to plan your next adventure?
            </p>
            <Button
              onClick={() => navigate('/plan-trip')}
              variant="secondary"
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50"
            >
              <Plus className="w-5 h-5 mr-2 inline" />
              Plan New Trip
            </Button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div
                  className={`inline-flex p-3 rounded-lg bg-${stat.color}-100 text-${stat.color}-600 mb-4`}
                >
                  {stat.icon}
                </div>
                <h3 className="text-gray-600 text-sm font-medium mb-1">
                  {stat.label}
                </h3>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="mb-8 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Recent Trips</h2>
            <Button
              onClick={() => navigate('/saved-itineraries')}
              variant="outline"
              size="sm"
            >
              View All
            </Button>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
              <p className="mt-4 text-gray-600">Loading trips...</p>
            </div>
          ) : trips.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={MapPinIcon}
              title="No trips yet"
              description="Start planning your first journey today!"
              actionLabel="Create Your First Trip"
              onAction={() => navigate('/plan-trip')}
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
