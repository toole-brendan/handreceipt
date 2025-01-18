import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

interface ViewProfileButtonProps {
  personnelId: string;
  disabled?: boolean;
}

export const ViewProfileButton: React.FC<ViewProfileButtonProps> = ({
  personnelId,
  disabled = false
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/personnel/${personnelId}/profile`);
  };

  return (
    <Button
      variant="outlined"
      onClick={handleClick}
      disabled={disabled}
      startIcon={<span className="material-icons">person</span>}
    >
      View Profile
    </Button>
  );
}; 