import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  MapPin,
  Route,
  Calendar,
  BarChart3,
  Shield,
  Zap,
} from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <MapPin className="w-8 h-8" />,
      title: 'Trip Planning',
      description:
        'Create and manage your travel itineraries with detailed information including source, destination, dates, and preferred transport modes.',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Route Optimization (Dijkstra)',
      description:
        'Advanced Dijkstra algorithm calculates the shortest path between locations, providing optimal routes with distance, time, and cost estimates.',
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: 'Real-Time Stats',
      description:
        'Track your travel history with dynamic statistics showing total trips, upcoming journeys, and total distance traveled.',
    },
    {
      icon: <Route className="w-8 h-8" />,
      title: 'Multiple Transport Modes',
      description:
        'Plan trips using various transport modes including car, train, bus, and walking with mode-specific route calculations.',
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Cost Estimation',
      description:
        'Get accurate fuel cost and toll cost estimates for your trips based on distance and transport mode.',
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Secure Authentication',
      description:
        'Your data is protected with secure password hashing using bcrypt, ensuring your travel information remains private.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-grow py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Features</h1>
            <p className="text-xl text-gray-600">
              Everything you need for smart travel planning
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-8 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">
                Experience Smart Travel Planning
              </h2>
              <p className="text-blue-100">
                Start using TravelSmart today and discover how easy it is to plan
                optimized journeys. Create your account and begin planning your next
                adventure!
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Features;

