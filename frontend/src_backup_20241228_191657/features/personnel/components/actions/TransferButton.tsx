import React from 'react';
import { Button } from '@/shared/components/components/Button';

interface TransferButtonProps {
  personnelId: string;
  onTransfer: () => void;
  disabled?: boolean;
}

export const TransferButton: React.FC<TransferButtonProps> = ({
  personnelId,
  onTransfer,
  disabled = false
}) => {
  return (
    <Button
      variant="secondary"
      onClick={onTransfer}
      disabled={disabled}
      icon="transfer"
    >
      Transfer Items
    </Button>
  );
}; 