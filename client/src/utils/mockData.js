export const mockUsers = [
  {
    id: 1,
    email: 'demo@travel.com',
    password: 'demo123',
    name: 'Alex Johnson',
    phone: '+1 234 567 8900',
    preferences: {
      transportMode: 'car',
      budget: 'medium',
    },
  },
];

export const mockTrips = [
  {
    id: 1,
    title: 'Weekend in Paris',
    source: 'London, UK',
    destination: 'Paris, France',
    date: '2024-02-15',
    time: '09:00',
    transportMode: 'train',
    distance: '344 km',
    duration: '2h 15m',
    status: 'upcoming',
    createdAt: '2024-01-10',
  },
  {
    id: 2,
    title: 'Business Trip NYC',
    source: 'Boston, MA',
    destination: 'New York, NY',
    date: '2024-02-20',
    time: '14:30',
    transportMode: 'car',
    distance: '215 miles',
    duration: '4h 30m',
    status: 'upcoming',
    createdAt: '2024-01-15',
  },
  {
    id: 3,
    title: 'Beach Vacation',
    source: 'Los Angeles, CA',
    destination: 'San Diego, CA',
    date: '2024-01-05',
    time: '10:00',
    transportMode: 'car',
    distance: '120 miles',
    duration: '2h',
    status: 'completed',
    createdAt: '2023-12-20',
  },
];

export const mockHotels = [
  {
    id: 1,
    name: 'The Grand Plaza Hotel',
    rating: 4.5,
    price: '$199/night',
    distance: '0.5 km from destination',
    image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800',
    amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant'],
  },
  {
    id: 2,
    name: 'Boutique City Inn',
    rating: 4.2,
    price: '$149/night',
    distance: '1.2 km from destination',
    image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800',
    amenities: ['WiFi', 'Breakfast', 'Bar'],
  },
  {
    id: 3,
    name: 'Comfort Suites Downtown',
    rating: 4.0,
    price: '$129/night',
    distance: '2.0 km from destination',
    image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800',
    amenities: ['WiFi', 'Gym', 'Parking'],
  },
];

export const mockRestaurants = [
  {
    id: 1,
    name: 'Le Petit Bistro',
    rating: 4.6,
    cuisine: 'French',
    priceRange: '$$$',
    distance: '0.3 km from destination',
    image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 2,
    name: 'Sakura Sushi Bar',
    rating: 4.4,
    cuisine: 'Japanese',
    priceRange: '$$',
    distance: '0.8 km from destination',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 3,
    name: 'The Steakhouse',
    rating: 4.5,
    cuisine: 'American',
    priceRange: '$$$$',
    distance: '1.5 km from destination',
    image: 'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 4,
    name: 'Bella Italia',
    rating: 4.3,
    cuisine: 'Italian',
    priceRange: '$$',
    distance: '1.0 km from destination',
    image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

export const mockAttractions = [
  {
    id: 1,
    name: 'National Art Museum',
    rating: 4.7,
    type: 'Museum',
    ticketPrice: '$25',
    distance: '1.5 km from destination',
    image: 'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg?auto=compress&cs=tinysrgb&w=800',
    openingHours: '9:00 AM - 6:00 PM',
  },
  {
    id: 2,
    name: 'Central Park',
    rating: 4.8,
    type: 'Park',
    ticketPrice: 'Free',
    distance: '2.0 km from destination',
    image: 'https://images.pexels.com/photos/1004665/pexels-photo-1004665.jpeg?auto=compress&cs=tinysrgb&w=800',
    openingHours: 'Open 24/7',
  },
  {
    id: 3,
    name: 'Historic Cathedral',
    rating: 4.6,
    type: 'Religious Site',
    ticketPrice: '$15',
    distance: '0.8 km from destination',
    image: 'https://images.pexels.com/photos/208315/pexels-photo-208315.jpeg?auto=compress&cs=tinysrgb&w=800',
    openingHours: '8:00 AM - 8:00 PM',
  },
  {
    id: 4,
    name: 'City Observatory',
    rating: 4.5,
    type: 'Observatory',
    ticketPrice: '$30',
    distance: '3.5 km from destination',
    image: 'https://images.pexels.com/photos/2034892/pexels-photo-2034892.jpeg?auto=compress&cs=tinysrgb&w=800',
    openingHours: '10:00 AM - 10:00 PM',
  },
];

export const mockRouteData = {
  coordinates: [
    { lat: 51.5074, lng: -0.1278 },
    { lat: 48.8566, lng: 2.3522 },
  ],
  waypoints: [
    { name: 'London, UK', lat: 51.5074, lng: -0.1278 },
    { name: 'Paris, France', lat: 48.8566, lng: 2.3522 },
  ],
};
