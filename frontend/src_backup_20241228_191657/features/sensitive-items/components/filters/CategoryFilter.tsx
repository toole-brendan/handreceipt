import React from 'react';

export const CategoryFilter: React.FC = () => {
  return (
    <div className="category-filter">
      <select className="filter-select">
        <option value="">All Categories</option>
        <option value="weapons">Weapons</option>
        <option value="optics">Optics</option>
        <option value="electronics">Electronics</option>
        <option value="other">Other</option>
      </select>
    </div>
  );
};
