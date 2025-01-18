import React, { useState } from 'react';

export const SerialSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="serial-search">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by serial number..."
        className="search-input"
      />
    </div>
  );
};
