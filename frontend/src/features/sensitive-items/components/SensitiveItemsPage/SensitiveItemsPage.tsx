import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Plus, ShieldAlert } from 'lucide-react';
import { SensitiveItemsTable } from '../tables/SensitiveItemsTable';
import { CategoryFilter } from '../filters/CategoryFilter';
import { LocationFilter } from '../filters/LocationFilter';
import { SerialSearch } from '../filters/SerialSearch';
import { VerifyNowButton } from '../verification/VerifyNowButton';
import DashboardCard from '@/components/common/DashboardCard';

interface FilterValue {
  category: string;
  location: string;
  search: string;
}

interface CategoryFilterProps {
  value: string;
  onChange: (value: string) => void;
}

interface LocationFilterProps {
  value: string;
  onChange: (value: string) => void;
}

interface SerialSearchProps {
  value: string;
  onChange: (value: string) => void;
}

const mockSensitiveItems = [
  {
    id: '1',
    name: 'M4A1 Carbine',
    serialNumber: 'W123456',
    category: 'Weapons',
    location: 'Armory A',
    lastVerified: '2024-01-25T10:00:00Z',
    status: 'verified'
  },
  // Add more mock items as needed
];

const SensitiveItemsMetrics: React.FC = () => {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 3 }}>
      <DashboardCard title="TOTAL ITEMS">
        <Box sx={{ textAlign: 'center' }}>
          <ShieldAlert className="h-5 w-5 mb-2" />
          <Typography variant="h3" sx={{ mb: 1, fontWeight: 600 }}>
            156
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Across all locations
          </Typography>
        </Box>
      </DashboardCard>

      <DashboardCard title="NEXT VERIFICATION">
        <Box sx={{ textAlign: 'center' }}>
          <ShieldAlert className="h-5 w-5 mb-2" />
          <Typography variant="h3" sx={{ mb: 1, fontWeight: 600 }}>
            2d 14h
          </Typography>
          <Typography variant="body2" color="success.main">
            On schedule
          </Typography>
        </Box>
      </DashboardCard>

      <DashboardCard title="LAST VERIFIED">
        <Box sx={{ textAlign: 'center' }}>
          <ShieldAlert className="h-5 w-5 mb-2" />
          <Typography variant="h3" sx={{ mb: 1, fontWeight: 600 }}>
            Jan 25
          </Typography>
          <Typography variant="body2" color="text.secondary">
            100% verified
          </Typography>
        </Box>
      </DashboardCard>

      <DashboardCard title="ALERTS">
        <Box sx={{ textAlign: 'center' }}>
          <ShieldAlert className="h-5 w-5 mb-2" />
          <Typography variant="h3" sx={{ mb: 1, fontWeight: 600 }}>
            0
          </Typography>
          <Typography variant="body2" color="success.main">
            All clear
          </Typography>
        </Box>
      </DashboardCard>
    </Box>
  );
};

export const SensitiveItemsPage: React.FC = () => {
  const [filters, setFilters] = useState<FilterValue>({
    category: '',
    location: '',
    search: ''
  });

  const handleFilterChange = (key: keyof FilterValue, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleNewItem = () => {
    // TODO: Implement navigation to new sensitive item form
  };

  const handleVerify = (id: string) => {
    // TODO: Implement verification logic
    console.log('Verify item:', id);
  };

  const handleViewDetails = (id: string) => {
    // TODO: Implement view details logic
    console.log('View details:', id);
  };

  const handleReportIssue = (id: string) => {
    // TODO: Implement report issue logic
    console.log('Report issue:', id);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, p: 3 }}>
      {/* Header Section */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 2 
      }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
            Sensitive Items
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Track and verify sensitive items across your unit
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <VerifyNowButton />
          <Button
            variant="contained"
            startIcon={<Plus />}
            onClick={handleNewItem}
            sx={{ height: 'fit-content' }}
          >
            New Item
          </Button>
        </Box>
      </Box>

      {/* Metrics Dashboard */}
      <SensitiveItemsMetrics />

      {/* Filters Section */}
      <Box sx={{ 
        bgcolor: '#121212',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: 1,
        p: 2,
        '&:hover': {
          borderColor: 'rgba(255, 255, 255, 0.2)',
        }
      }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Filters
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <CategoryFilter 
            value={filters.category}
            onChange={(value: string) => handleFilterChange('category', value)}
          />
          <LocationFilter 
            value={filters.location}
            onChange={(value: string) => handleFilterChange('location', value)}
          />
          <SerialSearch 
            value={filters.search}
            onChange={(value: string) => handleFilterChange('search', value)}
          />
        </Box>
      </Box>

      {/* Sensitive Items Table */}
      <Box sx={{ 
        bgcolor: '#121212',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: 1,
        p: 2,
        '&:hover': {
          borderColor: 'rgba(255, 255, 255, 0.2)',
        }
      }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Inventory
        </Typography>
        <SensitiveItemsTable 
          items={mockSensitiveItems}
          onVerify={handleVerify}
          onViewDetails={handleViewDetails}
          onReportIssue={handleReportIssue}
        />
      </Box>
    </Box>
  );
}; 