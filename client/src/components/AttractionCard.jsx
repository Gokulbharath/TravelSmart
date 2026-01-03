import { MapPin, Star, Clock, DollarSign } from 'lucide-react';
import Button from './Button';

const AttractionCard = ({ attraction }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
      <div className="h-48 overflow-hidden">
        <img
          src={attraction.image}
          alt={attraction.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          {attraction.name}
        </h3>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="ml-1 text-sm text-gray-700">
              {attraction.rating}
            </span>
          </div>
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
            {attraction.type}
          </span>
        </div>
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{attraction.distance}</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <Clock className="w-4 h-4 mr-1" />
            <span>{attraction.openingHours}</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <DollarSign className="w-4 h-4 mr-1" />
            <span>{attraction.ticketPrice}</span>
          </div>
        </div>
        <Button variant="primary" size="sm" fullWidth>
          Get Tickets
        </Button>
      </div>
    </div>
  );
};

export default AttractionCard;
