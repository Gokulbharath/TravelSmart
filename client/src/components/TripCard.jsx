import { MapPin, Calendar, Clock, Car, Train, Bus, Footprints } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

const TripCard = ({ trip, onDelete }) => {
  const navigate = useNavigate();

  const getTransportIcon = (mode) => {
    switch (mode) {
      case 'car':
        return <Car className="w-5 h-5" />;
      case 'train':
        return <Train className="w-5 h-5" />;
      case 'bus':
        return <Bus className="w-5 h-5" />;
      case 'walk':
        return <Footprints className="w-5 h-5" />;
      default:
        return <Car className="w-5 h-5" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">{trip.title}</h3>
          <div className="flex items-center text-gray-600 mb-1">
            <MapPin className="w-4 h-4 mr-2" />
            <span className="text-sm">
              {trip.source} → {trip.destination}
            </span>
          </div>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            trip.status === 'upcoming'
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {trip.status}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-gray-700">
          <Calendar className="w-4 h-4 mr-2" />
          <span className="text-sm">{trip.date}</span>
        </div>
        <div className="flex items-center text-gray-700">
          <Clock className="w-4 h-4 mr-2" />
          <span className="text-sm">{trip.time}</span>
        </div>
        <div className="flex items-center text-gray-700">
          {getTransportIcon(trip.transportMode)}
          <span className="text-sm ml-2 capitalize">{trip.transportMode}</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-600 mb-4 pt-4 border-t">
        <span>{trip.distance}</span>
        <span>{trip.duration}</span>
      </div>

      <div className="flex space-x-2">
        <Button
          onClick={() => navigate(`/trip/${trip.id}`)}
          variant="primary"
          size="sm"
          fullWidth
        >
          View Details
        </Button>
        {onDelete && (
          <Button onClick={() => onDelete(trip.id)} variant="danger" size="sm">
            Delete
          </Button>
        )}
      </div>
    </div>
  );
};

export default TripCard;
