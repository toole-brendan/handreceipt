import React from 'react';
import {
  Paper,
  Box,
  Typography,
  Button,
  Collapse,
  Divider,
  IconButton
} from '@mui/material';
import {
  KeyboardArrowDown as ExpandIcon,
  Description as DocIcon,
  Person as ProfileIcon
} from '@mui/icons-material';
import type { Personnel, HandReceiptItem } from '@/features/personnel/types';
import EquipmentTable from '../tables/AssignedItemsTable';

interface PersonnelCardProps {
  personnel: Personnel;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onHandReceipt: (personnelId: string) => void;
  onViewProfile: (personnelId: string) => void;
  onTransferEquipment: (equipmentId: string) => void;
  onViewEquipmentDetails: (equipmentId: string) => void;
}

const PersonnelCard: React.FC<PersonnelCardProps> = ({
  personnel,
  isExpanded,
  onToggleExpand,
  onHandReceipt,
  onViewProfile,
  onTransferEquipment,
  onViewEquipmentDetails,
}) => {
  return (
    <Paper 
      elevation={0}
      sx={{
        bgcolor: '#121212',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: 1,
        overflow: 'hidden'
      }}
    >
      {/* Header Section */}
      <Box 
        sx={{ 
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          '&:hover': {
            bgcolor: 'rgba(255, 255, 255, 0.03)'
          }
        }}
        onClick={onToggleExpand}
      >
        {/* Left side - Personnel Info */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton 
            size="small"
            sx={{
              transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s'
            }}
          >
            <ExpandIcon />
          </IconButton>
          
          <Box>
            <Typography variant="h6" sx={{ fontSize: '1.1rem' }}>
              {personnel.rank} {personnel.lastName}, {personnel.firstName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {personnel.position} • {personnel.platoon}
            </Typography>
          </Box>
        </Box>

        {/* Right side - Stats */}
        <Box sx={{ textAlign: 'right' }}>
          <Typography variant="body2" color="text.secondary">
            Assigned Items: {personnel.propertyStats.propertyCount}
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: personnel.status === 'present' ? 'success.main' : 'warning.main'
            }}
          >
            Status: {personnel.status.toUpperCase()}
          </Typography>
        </Box>
      </Box>

      {/* Expandable Content */}
      <Collapse in={isExpanded}>
        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
        <Box sx={{ p: 2 }}>
          {/* Equipment Table */}
          <EquipmentTable
            equipment={[]} // TODO: Get actual items from API
            onTransfer={onTransferEquipment}
            onViewDetails={onViewEquipmentDetails}
          />

          {/* Action Buttons */}
          <Box sx={{ 
            mt: 2,
            display: 'flex',
            gap: 1,
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            pt: 2
          }}>
            <Button
              variant="contained"
              startIcon={<DocIcon />}
              onClick={() => onHandReceipt(personnel.id)}
            >
              Hand Receipt
            </Button>
            <Button
              variant="outlined"
              startIcon={<ProfileIcon />}
              onClick={() => onViewProfile(personnel.id)}
            >
              View Profile
            </Button>
          </Box>
        </Box>
      </Collapse>
    </Paper>
  );
};

export default PersonnelCard; 