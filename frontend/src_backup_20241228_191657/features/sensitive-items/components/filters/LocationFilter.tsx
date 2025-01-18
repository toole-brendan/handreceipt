import React from 'react';

interface LocationFilterProps {
  selectedLocation: string;
  onLocationChange: (location: string) => void;
}

export const LocationFilter: React.FC<LocationFilterProps> = ({
  selectedLocation,
  onLocationChange
}) => {
  return (
    <div className="location-filter">
      <label htmlFor="location">Location</label>
      <select
        id="location"
        value={selectedLocation}
        onChange={(e) => onLocationChange(e.target.value)}
      >
        <option value="">All Locations</option>
        <option value="armory">Armory</option>
        <option value="motor-pool">Motor Pool</option>
        <option value="supply-room">Supply Room</option>
        <option value="field">Field</option>
      </select>
    </div>
  );
};

export default LocationFilter; 