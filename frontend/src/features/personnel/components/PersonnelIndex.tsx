import React, { useState } from 'react';
import { 
  Typography, 
  Box,
  TextField,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { Container } from '@/components/layout/mui/Container';
import { Stack } from '@/components/layout/mui/Stack';
import DashboardCard from '@/components/common/DashboardCard';
import PersonnelCard from './cards/PersonnelCard';
import { usePersonnelActions } from '../hooks/usePersonnelActions';
import type { Personnel, MilitaryRank } from '@/features/personnel/types';

// Mock data
const mockPersonnel: Personnel[] = [
  {
    id: "1",
    rank: "CPT" as MilitaryRank,
    firstName: "John",
    lastName: "Smith",
    dodId: "1234567890",
    unitId: "1",
    platoon: "HQ",
    position: "Company Commander",
    dutyPosition: "Commander",
    section: "Command",
    isCommander: true,
    isPrimaryHandReceipt: true,
    propertyAccess: {
      canSignFor: true,
      canTransfer: true,
      canInventory: true,
      sensitiveItems: true
    },
    propertyStats: {
      propertyCount: 2,
      sensitiveItemCount: 2,
      totalValue: 4000,
      pendingTransfers: 0
    },
    inventoryStatus: {
      lastInventory: new Date().toISOString(),
      nextInventoryDue: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      overdueCount: 0,
      cycleComplete: true
    },
    contact: {
      email: "john.smith@army.mil"
    },
    status: "present",
    clearance: "SECRET"
  },
  {
    id: "2",
    rank: "MSG" as MilitaryRank,
    firstName: "Michael",
    lastName: "Johnson",
    dodId: "0987654321",
    unitId: "1",
    platoon: "HQ",
    position: "First Sergeant",
    dutyPosition: "First Sergeant",
    section: "Command",
    isCommander: false,
    isPrimaryHandReceipt: true,
    propertyAccess: {
      canSignFor: true,
      canTransfer: true,
      canInventory: true,
      sensitiveItems: true
    },
    propertyStats: {
      propertyCount: 1,
      sensitiveItemCount: 1,
      totalValue: 800,
      pendingTransfers: 0
    },
    inventoryStatus: {
      lastInventory: new Date().toISOString(),
      nextInventoryDue: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      overdueCount: 0,
      cycleComplete: true
    },
    contact: {
      email: "michael.johnson@army.mil"
    },
    status: "present",
    clearance: "SECRET"
  }
];

const mockStats = {
  activePersonnel: 115,
  onMission: 20,
  onLeave: 5,
  inTraining: 15
};

const PersonnelIndex: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [personnel, setPersonnel] = useState<Personnel[]>(mockPersonnel);
  const [stats, setStats] = useState(mockStats);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const { generateHandReceipt, initiateTransfer, viewProfile } = usePersonnelActions();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleCardClick = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredPersonnel = React.useMemo(() => {
    if (!Array.isArray(personnel)) return [];
    
    return personnel.filter((person: Personnel) => {
      const matchesSearch = 
        `${person.rank} ${person.firstName} ${person.lastName} ${person.position || ''}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      return matchesSearch;
    });
  }, [personnel, searchQuery]);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container>
      <Stack spacing={3}>
        <Typography 
          variant="h4" 
          component="h1"
          sx={{
            ml: -4
          }}
        >
          Personnel Management
        </Typography>

        <Stack direction="row" spacing={2}>
          <DashboardCard title="Active Personnel">
            <Typography variant="h3" align="center">
              {stats.activePersonnel}
            </Typography>
          </DashboardCard>
          <DashboardCard title="On Mission">
            <Typography variant="h3" align="center">
              {stats.onMission}
            </Typography>
          </DashboardCard>
          <DashboardCard title="On Leave">
            <Typography variant="h3" align="center">
              {stats.onLeave}
            </Typography>
          </DashboardCard>
          <DashboardCard title="In Training">
            <Typography variant="h3" align="center">
              {stats.inTraining}
            </Typography>
          </DashboardCard>
        </Stack>

        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by name, rank, or position..."
          value={searchQuery}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            bgcolor: '#121212',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.1)',
              },
              '&:hover fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.2)',
              },
            },
          }}
        />

        <Stack spacing={2}>
          {filteredPersonnel.length > 0 ? (
            filteredPersonnel.map((person: Personnel) => (
              <PersonnelCard
                key={person.id}
                personnel={person}
                isExpanded={expandedId === person.id}
                onToggleExpand={() => handleCardClick(person.id)}
                onHandReceipt={generateHandReceipt}
                onViewProfile={viewProfile}
                onTransferEquipment={(equipmentId) => initiateTransfer(person.id, [equipmentId])}
                onViewEquipmentDetails={viewProfile}
              />
            ))
          ) : (
            <Box 
              sx={{ 
                py: 4, 
                textAlign: 'center',
                bgcolor: '#121212',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 1
              }}
            >
              <Typography color="textSecondary">
                No personnel found matching your search criteria
              </Typography>
            </Box>
          )}
        </Stack>
      </Stack>
    </Container>
  );
};

export default PersonnelIndex; 