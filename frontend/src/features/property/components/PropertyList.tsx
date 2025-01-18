import React from 'react';
import { Grid, Box, styled } from '@mui/material';
import { StaggerList } from '../../../components/common/mui/animations/StaggerList';
import { PropertyCard, PropertyItem } from './PropertyCard';

interface PropertyListProps {
  items: PropertyItem[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onViewHistory?: (id: string) => void;
  onGenerateQR?: (id: string) => void;
}

const ListContainer = styled(Box)(({ theme }) => ({
  width: '100%',
}));

const CardsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  margin: theme.spacing(-1.5),
  width: `calc(100% + ${theme.spacing(3)})`,
}));

export const PropertyList: React.FC<PropertyListProps> = ({
  items,
  onEdit,
  onDelete,
  onViewHistory,
  onGenerateQR,
}) => {
  return (
    <ListContainer>
      <CardsContainer>
        {items.map((item) => (
          <PropertyCard
            key={item.id}
            item={item}
            onEdit={onEdit}
            onDelete={onDelete}
            onViewHistory={onViewHistory}
            onGenerateQR={onGenerateQR}
          />
        ))}
      </CardsContainer>
    </ListContainer>
  );
}; 