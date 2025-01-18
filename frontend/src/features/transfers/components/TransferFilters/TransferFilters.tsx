/* frontend/src/features/transfer/components/TransferFilters.tsx */

import React, { useState } from 'react';
import {
  Select,
  MenuItem,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
} from '@mui/material';
import { 
  Settings, 
  RotateCcw,
  BookmarkPlus,
} from 'lucide-react';
import type { FiltersState, TransferType, TransferPriority, Category, TransferStatus } from '../../types';

interface TransferFiltersProps {
  filters: FiltersState;
  onFilterChange: (filters: FiltersState) => void;
}

const TransferFilters: React.FC<TransferFiltersProps> = ({ 
  filters, 
  onFilterChange 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleReset = () => {
    onFilterChange({
      search: '',
      type: undefined,
      priority: undefined,
      category: undefined,
      status: undefined
    });
    setIsOpen(false);
  };

  const handleTypeChange = (event: any) => {
    onFilterChange({ ...filters, type: event.target.value || undefined });
  };

  const handlePriorityChange = (event: any) => {
    onFilterChange({ ...filters, priority: event.target.value ? [event.target.value] : undefined });
  };

  const handleCategoryChange = (event: any) => {
    onFilterChange({ ...filters, category: event.target.value ? [event.target.value] : undefined });
  };

  const handleStatusChange = (event: any) => {
    onFilterChange({ ...filters, status: event.target.value ? [event.target.value] : undefined });
  };

  const saveAsPreset = () => {
    // TODO: Implement save preset functionality
    console.log('Saving current filters as preset:', filters);
  };

  return (
    <div className="space-y-4">
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Filter Transfers</DialogTitle>
        <DialogContent>
          <div className="mt-6 space-y-6">
            {/* Type Filter */}
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                value={filters.type || ''}
                onChange={handleTypeChange}
                label="Type"
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="incoming">Incoming</MenuItem>
                <MenuItem value="outgoing">Outgoing</MenuItem>
              </Select>
            </FormControl>

            {/* Priority Filter */}
            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select
                value={filters.priority?.[0] || ''}
                onChange={handlePriorityChange}
                label="Priority"
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="low">Low</MenuItem>
              </Select>
            </FormControl>

            {/* Category Filter */}
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={filters.category?.[0] || ''}
                onChange={handleCategoryChange}
                label="Category"
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="weapons">Weapons</MenuItem>
                <MenuItem value="ammunition">Ammunition</MenuItem>
                <MenuItem value="equipment">Equipment</MenuItem>
                <MenuItem value="vehicles">Vehicles</MenuItem>
                <MenuItem value="communications">Communications</MenuItem>
                <MenuItem value="medical">Medical</MenuItem>
              </Select>
            </FormControl>

            {/* Status Filter */}
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={filters.status?.[0] || ''}
                onChange={handleStatusChange}
                label="Status"
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="needs_approval">Needs Approval</MenuItem>
                <MenuItem value="pending_other">Pending Other</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
              </Select>
            </FormControl>

            {/* Actions */}
            <div className="flex justify-between pt-4">
              <Button
                variant="outlined"
                size="small"
                onClick={saveAsPreset}
                startIcon={<BookmarkPlus className="h-4 w-4" />}
              >
                Save Preset
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={handleReset}
                startIcon={<RotateCcw className="h-4 w-4" />}
              >
                Reset
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Active Filters Display */}
      {((filters.priority && filters.priority.length > 0) || 
        (filters.category && filters.category.length > 0) || 
        (filters.status && filters.status.length > 0)) && (
        <div className="flex flex-wrap gap-2">
          {filters.priority?.map(priority => (
            <div key={priority} className="rounded-full bg-primary/10 px-3 py-1 text-xs">
              {priority}
            </div>
          ))}
          {filters.category?.map(category => (
            <div key={category} className="rounded-full bg-primary/10 px-3 py-1 text-xs">
              {category}
            </div>
          ))}
          {filters.status?.map(status => (
            <div key={status} className="rounded-full bg-primary/10 px-3 py-1 text-xs">
              {status.replace('_', ' ')}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransferFilters;