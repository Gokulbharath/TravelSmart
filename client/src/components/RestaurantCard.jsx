import { MapPin, Star, Utensils } from 'lucide-react';
import Button from './Button';

const RestaurantCard = ({ restaurant }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
      <div className="h-48 overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          {restaurant.name}
        </h3>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="ml-1 text-sm text-gray-700">
              {restaurant.rating}
            </span>
          </div>
          <span className="text-sm text-gray-700 font-semibold">
            {restaurant.priceRange}
          </span>
        </div>
        <div className="flex items-center text-gray-600 text-sm mb-2">
          <Utensils className="w-4 h-4 mr-1" />
          <span>{restaurant.cuisine}</span>
        </div>
        <div className="flex items-center text-gray-600 text-sm mb-4">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{restaurant.distance}</span>
        </div>
        <Button variant="primary" size="sm" fullWidth>
          View Menu
        </Button>
      </div>
    </div>
  );
};

export default RestaurantCard;
