import React from 'react';
import { Box, Container, Typography, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import PersonnelCard from '@/features/personnel/components/cards/PersonnelCard';
import AssignedItemsTable from '@/features/personnel/components/tables/AssignedItemsTable';
import { usePersonnelData } from '@/features/personnel/hooks/usePersonnelData';
import { usePersonnelActions } from '@/features/personnel/hooks/usePersonnelActions';
import type { AssignedEquipment } from '@/features/personnel/types';

const PersonnelDashboardPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { personnel, isLoading, error } = usePersonnelData(id || '');
  const { 
    generateHandReceipt,
    initiateTransfer,
    viewProfile,
    isLoading: isActionLoading 
  } = usePersonnelActions();

  if (isLoading || !personnel) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  // Convert personnel data to match Soldier interface
  const soldierData = {
    id: personnel.id,
    rank: personnel.rank,
    firstName: personnel.firstName,
    lastName: personnel.lastName,
    position: personnel.position,
    section: personnel.section || 'Unknown',
    status: 'complete', // TODO: Map from personnel.inventoryStatus
    stats: {
      totalItems: personnel.propertyStats.propertyCount,
      sensitiveItems: personnel.propertyStats.sensitiveItemCount,
      lastInventoryDate: personnel.inventoryStatus.lastInventory
    },
    equipment: [] as AssignedEquipment[] // TODO: Map from personnel's assigned equipment
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Personnel Management
        </Typography>
        <PersonnelCard 
          soldier={soldierData}
          onHandReceipt={generateHandReceipt}
          onViewProfile={viewProfile}
          onTransferEquipment={(equipmentId) => initiateTransfer(personnel.id, [equipmentId])}
          onViewEquipmentDetails={(equipmentId) => {
            // TODO: Implement equipment details view
            console.log('View equipment details:', equipmentId);
          }}
        />
        <Box sx={{ mt: 4 }}>
          <AssignedItemsTable 
            equipment={soldierData.equipment}
            onTransfer={(equipmentId) => initiateTransfer(personnel.id, [equipmentId])}
            onViewDetails={(equipmentId) => {
              // TODO: Implement equipment details view
              console.log('View equipment details:', equipmentId);
            }}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default PersonnelDashboardPage;
