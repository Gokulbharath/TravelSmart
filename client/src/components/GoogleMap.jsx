import { useMemo } from 'react';
import { GoogleMap, useLoadScript, Marker, Polyline, TrafficLayer } from '@react-google-maps/api';

const libraries = ['places', 'directions', 'geocoding'];

const MapContainer = ({ center, markers = [], polylinePath = [], polylinePaths = [], showTraffic = false, zoom = 10, selectedRouteId = null }) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey || '',
    libraries,
  });

  const mapOptions = useMemo(() => ({
    zoomControl: true,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: true,
  }), []);

  const defaultCenter = useMemo(() => ({
    lat: 20.5937,
    lng: 78.9629,
  }), []);

  if (loadError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <div className="text-center p-8">
          <p className="text-red-600 font-semibold mb-2">Error loading Google Maps</p>
          <p className="text-gray-600 text-sm">Please check your API key configuration</p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '100%' }}
      center={center || defaultCenter}
      zoom={zoom}
      options={mapOptions}
    >
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={marker.position}
          label={marker.label}
          title={marker.title}
        />
      ))}
      {polylinePaths && polylinePaths.length > 0 ? (
        polylinePaths.map((route, index) => {
          if (!route || !route.polylinePath || route.polylinePath.length === 0) {
            return null;
          }
          const isSelected = selectedRouteId === route.id;
          const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];
          const routeColor = isSelected ? '#DC2626' : colors[index % colors.length];
          
          return (
            <Polyline
              key={route.id || index}
              path={route.polylinePath}
              options={{
                strokeColor: routeColor,
                strokeWeight: isSelected ? 6 : 4,
                strokeOpacity: isSelected ? 1 : 0.6,
                zIndex: isSelected ? 1000 : index,
              }}
            />
          );
        }).filter(Boolean)
      ) : polylinePath && polylinePath.length > 0 ? (
        <Polyline
          path={polylinePath}
          options={{
            strokeColor: '#3B82F6',
            strokeWeight: 4,
            strokeOpacity: 0.8,
          }}
        />
      ) : null}
      {showTraffic && <TrafficLayer />}
    </GoogleMap>
  );
};

export default MapContainer;

