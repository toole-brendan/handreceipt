import React from 'react';
import { Button } from '@mui/material';

interface HandReceiptButtonProps {
  personnelId: string;
  onGenerate: () => void;
  disabled?: boolean;
}

export const HandReceiptButton: React.FC<HandReceiptButtonProps> = ({
  personnelId,
  onGenerate,
  disabled = false
}) => {
  return (
    <Button
      variant="contained"
      onClick={onGenerate}
      disabled={disabled}
      startIcon={<span className="material-icons">description</span>}
    >
      Generate Hand Receipt
    </Button>
  );
}; 