import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

export const TablePagination: React.FC<TablePaginationProps> = ({
  currentPage,
  totalPages,
  startIndex,
  endIndex,
  totalItems,
  onPageChange,
}) => {
  return (
    <div className="pagination">
      <span className="item-count">
        Showing {startIndex + 1}-{Math.min(endIndex, totalItems)} of {totalItems} items
      </span>
      <div className="pagination-controls">
        <button
          className="page-button"
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft size={16} />
        </button>
        <span className="page-info">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="page-button"
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}; 