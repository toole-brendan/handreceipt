// frontend/src/pages/property/my-property/index.tsx
import React from 'react';
import { useCurrentUserProperty } from '@/hooks';
import { CurrentPropertyList } from './CurrentPropertyList';
import { HistoricalPropertyList } from './HistoricalPropertyList';
import '@/ui/styles/property/property-tables.css';

const MyProperty: React.FC = () => {
  const { property, loading, error } = useCurrentUserProperty();

  if (loading) return <div>Loading property...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="my-property-page">
      <h1>My Property</h1>
      <CurrentPropertyList property={property} />
      <HistoricalPropertyList />
    </div>
  );
};

export default MyProperty;