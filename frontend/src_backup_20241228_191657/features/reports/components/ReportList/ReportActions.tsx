import React from 'react';
import { Box, IconButton, styled } from '@mui/material';
import {
  Visibility as ViewIcon,
  GetApp as DownloadIcon,
  Print as PrintIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

interface ReportActionsProps {
  onView: () => void;
  onDownload: () => void;
  onPrint: () => void;
  onDelete: () => void;
}

const StyledIconButton = styled(IconButton)(() => ({
  color: 'rgba(255, 255, 255, 0.7)',
  padding: '8px',
  '&:hover': {
    color: '#FFFFFF',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  '& .MuiSvgIcon-root': {
    fontSize: '1.25rem',
  },
}));

const ActionButtonsContainer = styled(Box)(() => ({
  display: 'flex',
  gap: '4px',
}));

export const ReportActions: React.FC<ReportActionsProps> = ({
  onView,
  onDownload,
  onPrint,
  onDelete
}) => {
  return (
    <ActionButtonsContainer>
      <StyledIconButton
        onClick={onView}
        title="View Report"
      >
        <ViewIcon />
      </StyledIconButton>
      <StyledIconButton
        onClick={onDownload}
        title="Download Report"
      >
        <DownloadIcon />
      </StyledIconButton>
      <StyledIconButton
        onClick={onPrint}
        title="Print Report"
      >
        <PrintIcon />
      </StyledIconButton>
      <StyledIconButton
        onClick={onDelete}
        title="Delete Report"
        sx={{
          '&:hover': {
            color: '#FF3B3B',
          },
        }}
      >
        <DeleteIcon />
      </StyledIconButton>
    </ActionButtonsContainer>
  );
};

export default ReportActions; 