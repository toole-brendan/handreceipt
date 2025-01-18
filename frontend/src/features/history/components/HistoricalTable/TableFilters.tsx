import React from 'react';
import { Search } from 'lucide-react';

interface TableFiltersProps {
  searchQuery: string;
  selectedCategory: string;
  selectedYear: string;
  onSearchChange: (query: string) => void;
  onCategoryChange: (category: string) => void;
  onYearChange: (year: string) => void;
}

export const TableFilters: React.FC<TableFiltersProps> = ({
  searchQuery,
  selectedCategory,
  selectedYear,
  onSearchChange,
  onCategoryChange,
  onYearChange,
}) => {
  return (
    <div className="search-filters-card">
      <div className="search-field">
        <Search size={18} />
        <input
          type="text"
          placeholder="Search by item name or serial number"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="filters">
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="Weapons">Weapons</option>
          <option value="Protection">Protection</option>
          <option value="Equipment">Equipment</option>
        </select>

        <select
          value={selectedYear}
          onChange={(e) => onYearChange(e.target.value)}
        >
          <option value="any">Any Date</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
        </select>
      </div>
    </div>
  );
}; 