import { MapPin, Star } from 'lucide-react';
import Button from './Button';

const HotelCard = ({ hotel }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
      <div className="h-48 overflow-hidden">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-2">{hotel.name}</h3>
        <div className="flex items-center mb-2">
          <Star className="w-4 h-4 text-yellow-500 fill-current" />
          <span className="ml-1 text-sm text-gray-700">{hotel.rating}</span>
        </div>
        <div className="flex items-center text-gray-600 text-sm mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{hotel.distance}</span>
        </div>
        <div className="flex flex-wrap gap-1 mb-3">
          {hotel.amenities.map((amenity, index) => (
            <span
              key={index}
              className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded"
            >
              {amenity}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-blue-600">{hotel.price}</span>
          <Button variant="primary" size="sm">
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
