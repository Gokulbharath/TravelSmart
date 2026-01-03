import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { MapPin, Target, Zap } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-grow py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <MapPin className="w-12 h-12 text-blue-600" />
              <h1 className="text-4xl font-bold text-gray-900">About TravelSmart</h1>
            </div>
            <p className="text-xl text-gray-600">
              Your intelligent travel companion for optimized journeys
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              TravelSmart is designed to simplify trip planning and route optimization
              for travelers. Our platform helps you plan your journeys efficiently,
              calculate optimal routes using advanced algorithms, and manage all your
              travel itineraries in one place.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Whether you're planning a weekend getaway or a long-distance journey,
              TravelSmart provides the tools you need to make informed decisions about
              your travel routes and schedules.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What We Offer</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <Target className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Smart Trip Planning</h3>
                  <p className="text-gray-700">
                    Create and manage your travel itineraries with ease. Plan your trips
                    with all the essential details including dates, times, and preferred
                    transport modes.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Zap className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Route Optimization</h3>
                  <p className="text-gray-700">
                    Our advanced Dijkstra's algorithm calculates the shortest and most
                    efficient routes between your source and destination, helping you save
                    time and travel costs.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Real-Time Statistics</h3>
                  <p className="text-gray-700">
                    Track your travel history with real-time statistics including total
                    trips, upcoming journeys, and total distance traveled.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Our Technology</h2>
            <p className="text-gray-700">
              TravelSmart is built using modern web technologies including React for the
              frontend, Node.js and Express for the backend, and MongoDB for data storage.
              Our route optimization feature uses Dijkstra's algorithm, a proven shortest
              path finding algorithm used in computer science and navigation systems.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;

