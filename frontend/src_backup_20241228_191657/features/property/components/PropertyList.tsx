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
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(3),
  },
}));

export const PropertyList: React.FC<PropertyListProps> = ({
  items,
  onEdit,
  onDelete,
  onViewHistory,
  onGenerateQR,
}) => {
  const gridItems = items.map((item) => (
    <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
      <PropertyCard
        item={item}
        onEdit={onEdit}
        onDelete={onDelete}
        onViewHistory={onViewHistory}
        onGenerateQR={onGenerateQR}
      />
    </Grid>
  ));

  return (
    <ListContainer>
      <Grid container spacing={3} alignItems="stretch">
        <StaggerList
          staggerDelay={100}
          initialDelay={0}
          duration={500}
          direction="up"
          threshold={0.1}
        >
          {gridItems}
        </StaggerList>
      </Grid>
    </ListContainer>
  );
}; 