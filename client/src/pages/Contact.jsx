import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-grow py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
            <p className="text-xl text-gray-600">
              Get in touch with the TravelSmart team
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 rounded-lg p-3 mr-4">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Email</h3>
                  <p className="text-sm text-gray-600">General inquiries</p>
                </div>
              </div>
              <a
                href="mailto:info@travelsmart.com"
                className="text-blue-600 hover:underline font-medium"
              >
                info@travelsmart.com
              </a>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 rounded-lg p-3 mr-4">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Support</h3>
                  <p className="text-sm text-gray-600">Technical support</p>
                </div>
              </div>
              <a
                href="mailto:support@travelsmart.com"
                className="text-blue-600 hover:underline font-medium"
              >
                support@travelsmart.com
              </a>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 rounded-lg p-3 mr-4">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Phone</h3>
                  <p className="text-sm text-gray-600">Call us</p>
                </div>
              </div>
              <a
                href="tel:+1234567890"
                className="text-blue-600 hover:underline font-medium"
              >
                +1 (234) 567-8900
              </a>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 rounded-lg p-3 mr-4">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Business Hours</h3>
                  <p className="text-sm text-gray-600">Support availability</p>
                </div>
              </div>
              <p className="text-gray-700 font-medium">
                Monday - Friday: 9:00 AM - 6:00 PM
                <br />
                Saturday: 10:00 AM - 4:00 PM
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-start mb-6">
              <MapPin className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Office Address</h2>
                <p className="text-gray-700 leading-relaxed">
                  TravelSmart Headquarters
                  <br />
                  123 Travel Street
                  <br />
                  City, State 12345
                  <br />
                  Country
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Response Time
            </h3>
            <p className="text-gray-700">
              We aim to respond to all inquiries within 24-48 hours during business
              days. For urgent matters, please call our support line.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;

