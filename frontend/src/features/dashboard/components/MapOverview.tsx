import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Map, RefreshCw } from 'lucide-react';
import { useAssetLocations } from '@/hooks/useAssetLocations';
import 'leaflet/dist/leaflet.css';
import '@/ui/styles/components/dashboard/map-overview.css';

// Fix for default marker icons in react-leaflet
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

const MapOverview: React.FC = () => {
  const { locations, loading, error, refresh } = useAssetLocations();

  return (
    <div className="map-overview">
      <div className="map-overview__header">
        <div className="map-overview__title-group">
          <Map 
            className="map-overview__icon" 
            size={20}
            aria-hidden="true"
          />
          <h3 className="map-overview__title">Asset Distribution Map</h3>
        </div>
        <button 
          className="map-overview__refresh"
          onClick={refresh}
          aria-label="Refresh map"
        >
          <RefreshCw 
            size={16} 
            className={loading ? 'spinning' : ''} 
          />
        </button>
      </div>

      <div className="map-overview__content">
        {loading ? (
          <div className="map-overview__loading" role="status">
            <RefreshCw className="map-overview__loading-icon" />
            <span>Loading map data...</span>
          </div>
        ) : error ? (
          <div className="map-overview__error" role="alert">
            {error}
          </div>
        ) : (
          <div className="map-overview__map-container">
            <MapContainer
              center={[0, 0]}
              zoom={2}
              className="map-overview__map"
              attributionControl={false}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {locations.map((asset) => (
                <Marker
                  key={asset.id}
                  position={[asset.latitude, asset.longitude]}
                >
                  <Popup>
                    <div className="map-overview__popup">
                      <h4 className="map-overview__popup-title">{asset.name}</h4>
                      <div className={`map-overview__popup-status status-${asset.status}`}>
                        {asset.status}
                      </div>
                      <div className="map-overview__popup-update">
                        Last update: {new Date(asset.lastUpdate).toLocaleString()}
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapOverview; 