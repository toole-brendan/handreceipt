/* frontend/src/features/transfer/components/TransferFilters.tsx */

import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/features/shared/components/select";
import { Button } from "@/features/shared/components/button";
import { 
  Settings, 
  RotateCcw,
  BookmarkPlus,
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/features/shared/components/sheet";
import type { FiltersState, TransferType, TransferPriority, Category, TransferStatus } from '@/features/transfer';

interface TransferFiltersProps {
  filters: FiltersState;
  onFilterChange: (filters: FiltersState) => void;
}

const TransferFilters: React.FC<TransferFiltersProps> = ({ 
  filters, 
  onFilterChange 
}) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const handleReset = () => {
    onFilterChange({
      search: '',
      type: undefined,
      priority: undefined,
      category: undefined,
      status: undefined
    });
    setIsFiltersOpen(false);
  };

  const handlePriorityChange = (value: TransferPriority | '') => {
    onFilterChange({ ...filters, priority: value ? [value] : undefined });
  };

  const handleCategoryChange = (value: Category | '') => {
    onFilterChange({ ...filters, category: value ? [value] : undefined });
  };

  const handleStatusChange = (value: TransferStatus | '') => {
    onFilterChange({ ...filters, status: value ? [value] : undefined });
  };

  const handleTypeChange = (value: TransferType | '') => {
    onFilterChange({ ...filters, type: value || undefined });
  };

  const saveAsPreset = () => {
    // TODO: Implement save preset functionality
    console.log('Saving current filters as preset:', filters);
  };

  return (
    <div className="space-y-4">
      <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
        <SheetContent className="w-[400px]">
          <SheetHeader>
            <SheetTitle>Filter Transfers</SheetTitle>
          </SheetHeader>
          
          <div className="mt-6 space-y-6">
            {/* Type Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Type</label>
              <Select
                value={filters.type}
                onValueChange={handleTypeChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="incoming">Incoming</SelectItem>
                  <SelectItem value="outgoing">Outgoing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Priority Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Priority</label>
              <Select
                value={filters.priority?.[0] || ''}
                onValueChange={handlePriorityChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select
                value={filters.category?.[0] || ''}
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weapons">Weapons</SelectItem>
                  <SelectItem value="ammunition">Ammunition</SelectItem>
                  <SelectItem value="equipment">Equipment</SelectItem>
                  <SelectItem value="vehicles">Vehicles</SelectItem>
                  <SelectItem value="communications">Communications</SelectItem>
                  <SelectItem value="medical">Medical</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Status Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select
                value={filters.status?.[0] || ''}
                onValueChange={handleStatusChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="needs_approval">Needs Approval</SelectItem>
                  <SelectItem value="pending_other">Pending Other</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Actions */}
            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={saveAsPreset}
                className="gap-2"
              >
                <BookmarkPlus className="h-4 w-4" />
                Save Preset
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

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