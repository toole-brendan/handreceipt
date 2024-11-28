// frontend/src/ui/components/property/PropertyCard.tsx
import React from 'react';
import { Property } from '@/types/property';
import '@/ui/styles/components/property/property-card.css';

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <div className="property-card">
      <h3>{property.name}</h3>
      <div className="property-details">
        <p>
          <span>Serial Number</span>
          <span>{property.serialNumber}</span>
        </p>
        <p>
          <span>Category</span>
          <span>{property.category}</span>
        </p>
        <p>
          <span>Status</span>
          <span className={`status-badge status-${property.status}`}>
            {property.status}
          </span>
        </p>
        <p>
          <span>Date Assigned</span>
          <span>{new Date(property.dateAssigned).toLocaleDateString()}</span>
        </p>
      </div>
    </div>
  );
};