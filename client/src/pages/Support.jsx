import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { HelpCircle, MessageCircle, Book, AlertCircle } from 'lucide-react';

const Support = () => {
  const faqs = [
    {
      question: 'How do I create a new trip?',
      answer:
        'Navigate to "Plan Trip" from the dashboard, fill in your trip details including source, destination, date, time, and transport mode, then click "Create Trip".',
    },
    {
      question: 'How does route optimization work?',
      answer:
        'Our system uses Dijkstra algorithm to calculate the shortest path between your source and destination. Click "Optimize Route" on any trip details page to see the optimized path.',
    },
    {
      question: 'What transport modes are supported?',
      answer:
        'TravelSmart supports four transport modes: Car, Train, Bus, and Walk. Each mode has different speed calculations for accurate time estimates.',
    },
    {
      question: 'Can I edit or delete my trips?',
      answer:
        'Yes, you can view all your trips in the "My Trips" section and delete any trip. To edit, you can delete and recreate with updated information.',
    },
    {
      question: 'How is my data stored?',
      answer:
        'Your trip data is securely stored in MongoDB Atlas cloud database. Passwords are hashed using bcrypt for maximum security.',
    },
    {
      question: 'What locations are available for route optimization?',
      answer:
        'Currently, our route network includes major Indian cities including Coimbatore, Ooty, Bangalore, Madurai, and more. We continue to expand our coverage.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-grow py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <HelpCircle className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Help & Support</h1>
            <p className="text-xl text-gray-600">
              Find answers to common questions and get help
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <div className="flex items-start mb-6">
              <MessageCircle className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Need Help?
                </h2>
                <p className="text-gray-700">
                  If you have questions or need assistance, please check our FAQ
                  section below. For additional support, you can reach us at{' '}
                  <a
                    href="mailto:support@travelsmart.com"
                    className="text-blue-600 hover:underline"
                  >
                    support@travelsmart.com
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <div className="flex items-center mb-6">
              <Book className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-start">
                    <AlertCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                    {faq.question}
                  </h3>
                  <p className="text-gray-700 ml-7">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Still Need Help?
            </h3>
            <p className="text-gray-700">
              If you couldn't find the answer you're looking for, please contact our
              support team at{' '}
              <a
                href="mailto:support@travelsmart.com"
                className="text-blue-600 hover:underline font-semibold"
              >
                support@travelsmart.com
              </a>
              {' '}and we'll be happy to assist you.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Support;

