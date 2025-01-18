import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Divider,
  Grid,
  IconButton,
  Tooltip,
  styled,
  Theme,
  alpha,
  useTheme,
} from '@mui/material';
import {
  FilterList as FilterIcon,
  Print as PrintIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';
import { PropertyCard, PropertyItem } from './PropertyCard';
import { StatusChip } from '../../../components/common/mui/StatusChip';

interface PersonnelPropertyListProps {
  personnelId: string;
  showSensitiveItems: boolean;
  timeframe: string;
  items?: PropertyItem[];
  isLoading?: boolean;
  onFilterChange?: (filters: any) => void;
  onExport?: () => void;
  onPrint?: () => void;
}

const StyledContainer = styled(Paper)(({ theme }: { theme: Theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.03)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: 0,
  padding: theme.spacing(3),
}));

const HeaderSection = styled(Box)(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
}));

const ActionButton = styled(IconButton)(({ theme }: { theme: Theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.03)',
  marginLeft: theme.spacing(1),
  borderRadius: 0,
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
}));

const StyledDivider = styled(Divider)(({ theme }: { theme: Theme }) => ({
  margin: theme.spacing(3, 0),
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
}));

export const PersonnelPropertyList: React.FC<PersonnelPropertyListProps> = ({
  personnelId,
  showSensitiveItems,
  timeframe,
  items = [],
  isLoading = false,
  onFilterChange,
  onExport,
  onPrint,
}) => {
  const theme = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleFilterChange = (category: string | null) => {
    setSelectedCategory(category);
    onFilterChange?.({ category, showSensitiveItems, timeframe });
  };

  const filteredItems = selectedCategory
    ? items.filter(item => item.category === selectedCategory)
    : items;

  const categories = [...new Set(items.map(item => item.category))];
  const sensitiveItemsCount = items.filter(item => item.status === 'missing').length;

  return (
    <StyledContainer elevation={0}>
      <HeaderSection>
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
            Assigned Equipment
          </Typography>
          <Box display="flex" alignItems="center" gap={2}>
            <Typography 
              variant="body2"
              sx={{ 
                color: 'rgba(255, 255, 255, 0.7)',
                letterSpacing: '0.025em'
              }}
            >
              Total Items: {items.length}
            </Typography>
            {sensitiveItemsCount > 0 && (
              <StatusChip
                status="sensitive"
                label={`${sensitiveItemsCount} Missing Items`}
                size="small"
                variant="filled"
              />
            )}
          </Box>
        </Box>
        <Box>
          <Tooltip title="Filter" arrow>
            <ActionButton size="small" onClick={() => {}}>
              <FilterIcon fontSize="small" />
            </ActionButton>
          </Tooltip>
          <Tooltip title="Export" arrow>
            <ActionButton size="small" onClick={onExport}>
              <DownloadIcon fontSize="small" />
            </ActionButton>
          </Tooltip>
          <Tooltip title="Print" arrow>
            <ActionButton size="small" onClick={onPrint}>
              <PrintIcon fontSize="small" />
            </ActionButton>
          </Tooltip>
        </Box>
      </HeaderSection>

      <StyledDivider />

      {categories.length > 0 && (
        <Box mb={4}>
          <Typography 
            variant="subtitle2" 
            sx={{ 
              mb: 2,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'rgba(255, 255, 255, 0.7)',
            }}
          >
            Categories
          </Typography>
          <Box display="flex" gap={1} flexWrap="wrap">
            {categories.map(category => (
              <StatusChip
                key={category}
                label={category}
                status={selectedCategory === category ? 'verified' : 'inactive'}
                onClick={() => handleFilterChange(selectedCategory === category ? null : category)}
                variant={selectedCategory === category ? 'filled' : 'outlined'}
                clickable
              />
            ))}
          </Box>
        </Box>
      )}

      <Grid container spacing={3}>
        {filteredItems.map(item => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <PropertyCard item={item} />
          </Grid>
        ))}
      </Grid>

      {filteredItems.length === 0 && !isLoading && (
        <Box 
          display="flex" 
          justifyContent="center" 
          alignItems="center" 
          minHeight={200}
        >
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255, 255, 255, 0.5)',
              fontStyle: 'italic',
            }}
          >
            No items found
          </Typography>
        </Box>
      )}
    </StyledContainer>
  );
};

export default PersonnelPropertyList; 