import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/shared/components/inputs/button/button';

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
      variant="secondary"
      onClick={handleClick}
      disabled={disabled}
      icon="user"
    >
      View Profile
    </Button>
  );
}; 