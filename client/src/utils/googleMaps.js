import { convertUSDToINR, formatINR } from './currency.js';

const libraries = ['places', 'directions', 'geocoding'];

let directionsService = null;
let geocoder = null;

export const initializeGoogleMaps = () => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  
  if (!apiKey || !window.google) {
    return false;
  }

  if (!directionsService) {
    directionsService = new window.google.maps.DirectionsService();
  }

  if (!geocoder) {
    geocoder = new window.google.maps.Geocoder();
  }

  return true;
};

export const geocodeAddress = (address) => {
  return new Promise((resolve, reject) => {
    if (!window.google) {
      reject(new Error('Google Maps not loaded'));
      return;
    }

    initializeGoogleMaps();

    geocoder.geocode({ address }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const location = results[0].geometry.location;
        resolve({
          lat: location.lat(),
          lng: location.lng(),
          address: results[0].formatted_address,
        });
      } else {
        reject(new Error(`Geocoding failed: ${status}`));
      }
    });
  });
};

export const getMultipleRoutes = (source, destination, transportMode = 'driving') => {
  return new Promise((resolve, reject) => {
    if (!window.google) {
      reject(new Error('Google Maps not loaded'));
      return;
    }

    initializeGoogleMaps();

    const modeMap = {
      car: window.google.maps.TravelMode.DRIVING,
      walk: window.google.maps.TravelMode.WALKING,
      bus: window.google.maps.TravelMode.TRANSIT,
      train: window.google.maps.TravelMode.TRANSIT,
    };

    const travelMode = modeMap[transportMode] || window.google.maps.TravelMode.DRIVING;

    directionsService.route(
      {
        origin: source,
        destination: destination,
        travelMode: travelMode,
        provideRouteAlternatives: true,
        drivingOptions: travelMode === window.google.maps.TravelMode.DRIVING ? {
          departureTime: new Date(),
          trafficModel: window.google.maps.TrafficModel.BEST_GUESS,
        } : undefined,
      },
      (result, status) => {
        if (status === 'OK' && result.routes && result.routes.length > 0) {
          const routes = result.routes.map((route, index) => {
            if (!route.legs || route.legs.length === 0) {
              return null;
            }

            const leg = route.legs[0];
            
            const overviewPath = route.overview_path || [];
            const path = overviewPath.map((latLng) => ({
              lat: latLng.lat(),
              lng: latLng.lng(),
            }));

            const distanceText = leg.distance?.text || 'N/A';
            const distanceValue = leg.distance?.value || 0;
            const durationText = leg.duration?.text || 'N/A';
            const durationInTraffic = leg.duration_in_traffic
              ? leg.duration_in_traffic.text
              : durationText;
            const durationInTrafficValue = leg.duration_in_traffic
              ? leg.duration_in_traffic.value
              : (leg.duration?.value || 0);

            const fuelCostUSD = calculateFuelCost(distanceValue, transportMode);
            const tollCostUSD = calculateTollCost(distanceValue);
            const totalCostUSD = fuelCostUSD + tollCostUSD;

            const fuelCostINR = convertUSDToINR(fuelCostUSD);
            const tollCostINR = convertUSDToINR(tollCostUSD);
            const totalCostINR = convertUSDToINR(totalCostUSD);

            const eta = durationInTrafficValue > 0 
              ? new Date(Date.now() + durationInTrafficValue * 1000).toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : 'N/A';

            return {
              id: `google-route-${index}`,
              distance: distanceText,
              distanceValue,
              duration: durationInTraffic,
              durationValue: durationInTrafficValue,
              eta,
              fuelCost: formatINR(fuelCostINR),
              tollCost: formatINR(tollCostINR),
              totalCost: totalCostINR,
              polylinePath: path,
              summary: route.summary || `Route ${index + 1}`,
              algorithm: 'Google Maps (Traffic-aware)',
              type: 'Google Maps',
              warnings: route.warnings || [],
            };
          }).filter(route => route !== null);

          if (routes.length === 0) {
            reject(new Error('No valid routes found'));
            return;
          }

          const firstRoute = result.routes[0];
          const firstLeg = firstRoute.legs[0];

          resolve({
            success: true,
            routes,
            startLocation: {
              lat: firstLeg.start_location?.lat() || 0,
              lng: firstLeg.start_location?.lng() || 0,
            },
            endLocation: {
              lat: firstLeg.end_location?.lat() || 0,
              lng: firstLeg.end_location?.lng() || 0,
            },
          });
        } else {
          reject(new Error(`Directions failed: ${status}`));
        }
      }
    );
  });
};

const calculateFuelCost = (distanceMeters, transportMode) => {
  const distanceKm = distanceMeters / 1000;
  const fuelPricePerLiter = 1.2;
  
  const fuelConsumption = {
    car: 10,
    bus: 5,
    train: 0,
    walk: 0,
  };

  const consumption = fuelConsumption[transportMode] || 10;
  return (distanceKm / 100) * consumption * fuelPricePerLiter;
};

const calculateTollCost = (distanceMeters) => {
  const distanceKm = distanceMeters / 1000;
  return distanceKm * 0.05;
};

