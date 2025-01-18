import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { Plus, Wrench } from 'lucide-react';
import { RequestTable } from '../RequestManagement/RequestTable';
import type { MaintenanceRequest } from '../../types/maintenance.types';
import DashboardCard from '@/components/common/DashboardCard';

interface FilterValue {
  status: string;
  priority: string;
  search: string;
}

// Mock data for maintenance requests
const mockRequests: MaintenanceRequest[] = [
  {
    id: '1',
    itemId: 'ITEM-001',
    itemName: 'M4A1 Carbine',
    requestType: 'inspection',
    priority: 'high',
    status: 'pending',
    description: 'Annual inspection required',
    submittedBy: 'John Doe',
    submittedAt: '2024-01-25T10:00:00Z',
    updatedAt: '2024-01-25T10:00:00Z'
  },
  {
    id: '2',
    itemId: 'ITEM-002',
    itemName: 'HMMWV',
    requestType: 'repair',
    priority: 'critical',
    status: 'in_progress',
    description: 'Engine malfunction',
    submittedBy: 'Jane Smith',
    submittedAt: '2024-01-24T15:30:00Z',
    updatedAt: '2024-01-25T09:15:00Z',
    assignedTo: 'Mike Johnson'
  }
];

const MaintenanceMetrics: React.FC = () => {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }}>
      <DashboardCard title="Open Requests">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="h3">12</Typography>
          <Typography variant="body2" color="text.secondary">
            +3 from last week
          </Typography>
        </Box>
      </DashboardCard>

      <DashboardCard title="In Progress">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="h3">5</Typography>
          <Typography variant="body2" color="text.secondary">
            -2 from last week
          </Typography>
        </Box>
      </DashboardCard>

      <DashboardCard title="Completed Today">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="h3">8</Typography>
          <Typography variant="body2" color="success.main">
            +5 from yesterday
          </Typography>
        </Box>
      </DashboardCard>

      <DashboardCard title="Average Time">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="h3">3.2d</Typography>
          <Typography variant="body2" color="success.main">
            -0.5d from last week
          </Typography>
        </Box>
      </DashboardCard>
    </Box>
  );
};

export const MaintenancePage: React.FC = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<FilterValue>({
    status: '',
    priority: '',
    search: ''
  });

  const handleFilterChange = (key: keyof FilterValue, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleNewRequest = () => {
    navigate('/maintenance/request');
  };

  const handleStatusChange = (requestId: string, status: MaintenanceRequest['status']) => {
    // TODO: Implement status change logic
    console.log('Status change:', requestId, status);
  };

  const handleViewDetails = (request: MaintenanceRequest) => {
    // TODO: Implement view details logic
    console.log('View details:', request);
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
            Maintenance
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Track and manage maintenance requests for your unit's equipment
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Plus />}
          onClick={handleNewRequest}
          sx={{ height: 'fit-content' }}
        >
          New Request
        </Button>
      </Box>

      {/* Metrics Dashboard */}
      <MaintenanceMetrics />

      {/* Maintenance Requests Table */}
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
          Maintenance Requests
        </Typography>
        <RequestTable 
          requests={mockRequests}
          onStatusChange={handleStatusChange}
          onViewDetails={handleViewDetails}
        />
      </Box>
    </Box>
  );
}; 