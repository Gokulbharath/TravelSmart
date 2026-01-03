import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Phone, Car, DollarSign, Save, AlertCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { mockAPI } from '../utils/mockAPI';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [trips, setTrips] = useState([]);
  const [statsLoading, setStatsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    transportMode: user?.preferences?.transportMode || 'car',
    budget: user?.preferences?.budget || 'medium',
  });

  useEffect(() => {
    const fetchTrips = async () => {
      if (!user?.id) {
        setStatsLoading(false);
        return;
      }
      setStatsLoading(true);
      const response = await mockAPI.getTrips(user.id);
      if (response.success) {
        setTrips(response.trips || []);
      }
      setStatsLoading(false);
    };

    if (user) {
      fetchTrips();
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    const response = await mockAPI.updateProfile(user.id, {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      preferences: {
        transportMode: formData.transportMode,
        budget: formData.budget,
      },
    });

    setLoading(false);

    if (response.success && response.user) {
      updateUser({
        ...response.user,
        id: response.user.id || user.id,
      });
      setSuccess(true);
      setIsEditing(false);
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  const transportModes = [
    { value: 'car', label: 'Car' },
    { value: 'train', label: 'Train' },
    { value: 'bus', label: 'Bus' },
    { value: 'walk', label: 'Walk' },
  ];

  const budgetOptions = [
    { value: 'low', label: 'Budget Friendly' },
    { value: 'medium', label: 'Moderate' },
    { value: 'high', label: 'Premium' },
  ];

  const totalTrips = trips.length;

  const totalDistance = trips.reduce((sum, trip) => {
    if (trip.distance && trip.distance.trim() !== '') {
      const distanceStr = trip.distance.toString().replace(/[^\d.]/g, '');
      const distanceNum = parseFloat(distanceStr);
      if (!isNaN(distanceNum) && distanceNum > 0) {
        return sum + distanceNum;
      }
    }
    return sum;
  }, 0);

  const countriesVisited = new Set(
    trips
      .filter((trip) => trip.destination && trip.destination.trim() !== '')
      .map((trip) => trip.destination.trim())
  ).size;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-grow py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              My Profile
            </h1>
            <p className="text-gray-600">
              Manage your account settings and preferences
            </p>
          </div>

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start">
              <AlertCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
              <div>
                <p className="text-green-800 font-semibold">
                  Profile updated successfully!
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-blue-100 rounded-full mb-4">
                    <User className="w-12 h-12 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">
                    {user?.name}
                  </h2>
                  <p className="text-sm text-gray-600 mb-4">{user?.email}</p>
                  <div className="text-sm text-gray-600 space-y-2">
                    <div className="flex items-center justify-center">
                      <Mail className="w-4 h-4 mr-2" />
                      <span>Member since 2024</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg shadow-md p-6 mt-6 text-white">
                <h3 className="text-lg font-bold mb-2">Travel Stats</h3>
                {statsLoading ? (
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-blue-100">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-blue-100">Total Trips:</span>
                      <span className="font-bold">{totalTrips}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-100">Countries Visited:</span>
                      <span className="font-bold">{countriesVisited}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-100">Total Distance:</span>
                      <span className="font-bold">
                        {totalDistance > 0 ? `${totalDistance.toLocaleString('en-US', { maximumFractionDigits: 0 })} km` : '0 km'}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    Personal Information
                  </h2>
                  {!isEditing && (
                    <Button
                      onClick={() => setIsEditing(true)}
                      variant="outline"
                      size="sm"
                    >
                      Edit Profile
                    </Button>
                  )}
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                      Travel Preferences
                    </h3>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Preferred Transport Mode
                        </label>
                        <div className="relative">
                          <Car className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <select
                            name="transportMode"
                            value={formData.transportMode}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                          >
                            {transportModes.map((mode) => (
                              <option key={mode.value} value={mode.value}>
                                {mode.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Travel Budget
                        </label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <select
                            name="budget"
                            value={formData.budget}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                          >
                            {budgetOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {isEditing && (
                    <div className="mt-6 flex space-x-3">
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        disabled={loading}
                      >
                        <Save className="w-4 h-4 mr-2 inline" />
                        {loading ? 'Saving...' : 'Save Changes'}
                      </Button>
                      <Button
                        type="button"
                        onClick={() => {
                          setIsEditing(false);
                          setFormData({
                            name: user?.name || '',
                            email: user?.email || '',
                            phone: user?.phone || '',
                            transportMode: user?.preferences?.transportMode || 'car',
                            budget: user?.preferences?.budget || 'medium',
                          });
                        }}
                        variant="secondary"
                        size="lg"
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
