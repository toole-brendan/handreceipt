import React from 'react';
import { Button } from '@/shared/components/components/Button';

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
      variant="primary"
      onClick={onGenerate}
      disabled={disabled}
      icon="document"
    >
      Generate Hand Receipt
    </Button>
  );
}; 