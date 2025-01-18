/* frontend/src/ui/components/reports/ReportFilters.tsx */

import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  styled,
} from '@mui/material';
import { RestartAlt as ResetIcon } from '@mui/icons-material';

export interface ReportFilters {
  dateRange: {
    start: string;
    end: string;
  };
  status: string;
  classification?: string;
}

interface ReportFiltersProps {
  onFilterChange: (filters: ReportFilters) => void;
  initialFilters?: Partial<ReportFilters>;
  showClassification?: boolean;
}

const FiltersContainer = styled(Box)(() => ({
  backgroundColor: '#000000',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  padding: '24px',
  marginBottom: '24px',
}));

const FiltersGrid = styled(Box)(() => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '24px',
  marginBottom: '24px',
}));

const StyledFormControl = styled(FormControl)(() => ({
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 255, 255, 0.7)',
    '&.Mui-focused': {
      color: '#FFFFFF',
    },
  },
  '& .MuiOutlinedInput-root': {
    color: '#FFFFFF',
    '& fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.2)',
      borderRadius: 0,
    },
    '&:hover fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#FFFFFF',
    },
  },
  '& .MuiSelect-icon': {
    color: 'rgba(255, 255, 255, 0.7)',
  },
}));

const StyledTextField = styled(TextField)(() => ({
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 255, 255, 0.7)',
    '&.Mui-focused': {
      color: '#FFFFFF',
    },
  },
  '& .MuiOutlinedInput-root': {
    color: '#FFFFFF',
    '& fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.2)',
      borderRadius: 0,
    },
    '&:hover fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#FFFFFF',
    },
  },
  '& input[type="date"]::-webkit-calendar-picker-indicator': {
    filter: 'invert(1)',
  },
}));

const StyledButton = styled(Button)(() => ({
  backgroundColor: 'transparent',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: 0,
  color: '#FFFFFF',
  padding: '8px 24px',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.4)',
  },
}));

export const ReportFilters: React.FC<ReportFiltersProps> = ({
  onFilterChange,
  initialFilters,
  showClassification = true,
}) => {
  const [filters, setFilters] = useState<ReportFilters>({
    dateRange: {
      start: initialFilters?.dateRange?.start || '',
      end: initialFilters?.dateRange?.end || '',
    },
    status: initialFilters?.status || '',
    classification: initialFilters?.classification || '',
  });

  const handleFilterChange = <K extends keyof ReportFilters>(
    key: K,
    value: ReportFilters[K]
  ) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleDateChange = (key: 'start' | 'end', value: string) => {
    const newDateRange = { ...filters.dateRange, [key]: value };
    handleFilterChange('dateRange', newDateRange);
  };

  return (
    <FiltersContainer>
      <FiltersGrid>
        <Box>
          <StyledTextField
            label="Start Date"
            type="date"
            value={filters.dateRange.start}
            onChange={(e) => handleDateChange('start', e.target.value)}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Box>
        <Box>
          <StyledTextField
            label="End Date"
            type="date"
            value={filters.dateRange.end}
            onChange={(e) => handleDateChange('end', e.target.value)}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Box>
        <StyledFormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            label="Status"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Generated">Generated</MenuItem>
            <MenuItem value="Processing">Processing</MenuItem>
            <MenuItem value="Failed">Failed</MenuItem>
          </Select>
        </StyledFormControl>

        {showClassification && (
          <StyledFormControl fullWidth>
            <InputLabel>Classification</InputLabel>
            <Select
              value={filters.classification}
              onChange={(e) => handleFilterChange('classification', e.target.value)}
              label="Classification"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="UNCLASSIFIED">UNCLASSIFIED</MenuItem>
              <MenuItem value="CONFIDENTIAL">CONFIDENTIAL</MenuItem>
              <MenuItem value="SECRET">SECRET</MenuItem>
              <MenuItem value="TOP_SECRET">TOP SECRET</MenuItem>
            </Select>
          </StyledFormControl>
        )}
      </FiltersGrid>

      <Box>
        <StyledButton
          startIcon={<ResetIcon />}
          onClick={() => {
            const defaultFilters = {
              dateRange: { start: '', end: '' },
              status: '',
              classification: '',
            };
            setFilters(defaultFilters);
            onFilterChange(defaultFilters);
          }}
        >
          Reset Filters
        </StyledButton>
      </Box>
    </FiltersContainer>
  );
};

export default ReportFilters; 