import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  IconButton,
  Tooltip,
  styled,
  Theme,
  alpha,
} from '@mui/material';
import {
  Check as CheckIcon,
  Close as CloseIcon,
  PhotoCamera as PhotoCameraIcon,
  Notes as NotesIcon,
} from '@mui/icons-material';
import { PropertyItem } from './PropertyCard';
import { StatusChip } from '../../../components/common/mui/StatusChip';

interface PropertyReviewProps {
  item: PropertyItem;
  onApprove: (id: string, notes?: string) => void;
  onReject: (id: string, reason: string) => void;
  onAddPhoto: (id: string, photo: File) => void;
  onAddNote: (id: string, note: string) => void;
}

const StyledContainer = styled(Paper)(({ theme }: { theme: Theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.03)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: 0,
  padding: theme.spacing(3),
}));

const ReviewHeader = styled(Box)(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: theme.spacing(4),
}));

const ActionButton = styled(Button)(({ theme }: { theme: Theme }) => ({
  borderRadius: 0,
  padding: theme.spacing(1, 3),
  fontWeight: 600,
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  '&.approve': {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    color: '#4CAF50',
    border: '1px solid rgba(76, 175, 80, 0.3)',
    '&:hover': {
      backgroundColor: 'rgba(76, 175, 80, 0.2)',
      border: '1px solid rgba(76, 175, 80, 0.5)',
    },
  },
  '&.reject': {
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
    color: '#F44336',
    border: '1px solid rgba(244, 67, 54, 0.3)',
    '&:hover': {
      backgroundColor: 'rgba(244, 67, 54, 0.2)',
      border: '1px solid rgba(244, 67, 54, 0.5)',
    },
  },
}));

const MediaButton = styled(IconButton)(({ theme }: { theme: Theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.03)',
  marginRight: theme.spacing(1),
  borderRadius: 0,
  border: '1px solid rgba(255, 255, 255, 0.1)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
})) as typeof IconButton;

const steps = ['Initial Review', 'Physical Inspection', 'Documentation', 'Final Decision'];

export const PropertyReview: React.FC<PropertyReviewProps> = ({
  item,
  onApprove,
  onReject,
  onAddPhoto,
  onAddNote,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [notes, setNotes] = useState('');

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onAddPhoto(item.id, file);
    }
  };

  return (
    <StyledContainer elevation={0}>
      <ReviewHeader>
        <Box>
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 600,
              letterSpacing: '0.02em',
              color: '#FFFFFF',
              mb: 1 
            }}
          >
            Property Review
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.7)',
              letterSpacing: '0.025em',
            }}
          >
            {item.name} - {item.serialNumber}
          </Typography>
        </Box>
        <StatusChip
          status={item.status === 'serviceable' ? 'verified' : 'pending'}
          label={item.status.toUpperCase()}
          variant={item.status === 'serviceable' ? 'filled' : 'outlined'}
        />
      </ReviewHeader>

      <Stepper 
        activeStep={activeStep} 
        sx={{ 
          mb: 4,
          '& .MuiStepLabel-label': {
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.875rem',
            fontWeight: 500,
            color: 'rgba(255, 255, 255, 0.7)',
            '&.Mui-active': {
              color: '#FFFFFF',
            },
            '&.Mui-completed': {
              color: '#FFFFFF',
            },
          },
          '& .MuiStepIcon-root': {
            color: 'rgba(255, 255, 255, 0.1)',
            '&.Mui-active': {
              color: '#FFFFFF',
            },
            '&.Mui-completed': {
              color: 'rgba(255, 255, 255, 0.5)',
            },
          },
          '& .MuiStepConnector-line': {
            borderColor: 'rgba(255, 255, 255, 0.1)',
          },
        }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', mb: 2 }}>
          <input
            accept="image/*"
            id="photo-upload"
            type="file"
            hidden
            onChange={handlePhotoUpload}
          />
          <label htmlFor="photo-upload">
            <Tooltip title="Add Photo" arrow>
              <MediaButton component="span">
                <PhotoCameraIcon fontSize="small" />
              </MediaButton>
            </Tooltip>
          </label>
          <Tooltip title="Add Note" arrow>
            <MediaButton onClick={() => onAddNote(item.id, notes)}>
              <NotesIcon fontSize="small" />
            </MediaButton>
          </Tooltip>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ 
              color: 'rgba(255, 255, 255, 0.5)',
              '&:hover': {
                color: '#FFFFFF',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
              },
              '&.Mui-disabled': {
                color: 'rgba(255, 255, 255, 0.3)',
              },
            }}
          >
            Back
          </Button>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <ActionButton
              className="reject"
              onClick={() => onReject(item.id, notes)}
              startIcon={<CloseIcon />}
            >
              Reject
            </ActionButton>
            <ActionButton
              className="approve"
              onClick={() => onApprove(item.id, notes)}
              startIcon={<CheckIcon />}
            >
              Approve
            </ActionButton>
          </Box>
        </Box>
      </Box>
    </StyledContainer>
  );
};

export default PropertyReview; 