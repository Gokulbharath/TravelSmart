import { useState, useEffect } from 'react';
import { Hotel, Utensils, Landmark } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HotelCard from '../components/HotelCard';
import RestaurantCard from '../components/RestaurantCard';
import AttractionCard from '../components/AttractionCard';
import { mockAPI } from '../utils/mockAPI';

const Recommendations = () => {
  const [activeTab, setActiveTab] = useState('hotels');
  const [hotels, setHotels] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      const [hotelsRes, restaurantsRes, attractionsRes] = await Promise.all([
        mockAPI.getHotels(),
        mockAPI.getRestaurants(),
        mockAPI.getAttractions(),
      ]);

      if (hotelsRes.success) setHotels(hotelsRes.hotels);
      if (restaurantsRes.success) setRestaurants(restaurantsRes.restaurants);
      if (attractionsRes.success) setAttractions(attractionsRes.attractions);

      setLoading(false);
    };

    fetchRecommendations();
  }, []);

  const tabs = [
    {
      id: 'hotels',
      label: 'Hotels',
      icon: <Hotel className="w-5 h-5" />,
      count: hotels.length,
    },
    {
      id: 'restaurants',
      label: 'Restaurants',
      icon: <Utensils className="w-5 h-5" />,
      count: restaurants.length,
    },
    {
      id: 'attractions',
      label: 'Attractions',
      icon: <Landmark className="w-5 h-5" />,
      count: attractions.length,
    },
  ];

  const renderContent = () => {
    if (loading) {
      return (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Loading recommendations...</p>
        </div>
      );
    }

    switch (activeTab) {
      case 'hotels':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        );
      case 'restaurants':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        );
      case 'attractions':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {attractions.map((attraction) => (
              <AttractionCard key={attraction.id} attraction={attraction} />
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-grow py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Recommendations
            </h1>
            <p className="text-gray-600">
              Discover the best places near your destination
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6" aria-label="Tabs">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                    <span
                      className={`ml-2 py-0.5 px-2 rounded-full text-xs ${
                        activeTab === tab.id
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">{renderContent()}</div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Recommendations;
