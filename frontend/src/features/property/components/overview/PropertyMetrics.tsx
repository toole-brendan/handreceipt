import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  styled,
  useTheme,
  alpha,
} from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';

interface MetricsCardProps {
  title: string;
  value: string | number;
  change?: number;
  timeframe?: string;
  icon?: React.ReactNode;
}

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  backgroundColor: '#000000',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    border: '1px solid rgba(255, 255, 255, 0.4)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 48,
  height: 48,
  borderRadius: 0,
  backgroundColor: 'transparent',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  color: '#FFFFFF',
  marginBottom: theme.spacing(2),
}));

export const MetricsCard: React.FC<MetricsCardProps> = ({
  title,
  value,
  change,
  timeframe = 'vs last period',
  icon
}) => {
  const theme = useTheme();
  const isPositiveChange = change !== undefined && change >= 0;
  const changeColor = isPositiveChange ? '#4CAF50' : '#FF3B3B';

  return (
    <StyledCard>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ mb: 3 }}>
          {icon && (
            <IconWrapper>
              {icon}
            </IconWrapper>
          )}
          <Typography
            variant="subtitle2"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontWeight: 500,
              fontSize: '0.75rem'
            }}
            gutterBottom
          >
            {title}
          </Typography>
        </Box>

        <Typography
          variant="h4"
          component="div"
          sx={{
            mb: 2,
            fontWeight: 600,
            color: '#FFFFFF',
            fontFamily: 'serif'
          }}
        >
          {value}
        </Typography>

        {change !== undefined && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {isPositiveChange ? (
              <TrendingUp sx={{ color: changeColor, fontSize: 20 }} />
            ) : (
              <TrendingDown sx={{ color: changeColor, fontSize: 20 }} />
            )}
            <Typography
              variant="body2"
              sx={{ 
                color: changeColor,
                fontWeight: 500,
                letterSpacing: '0.05em'
              }}
            >
              {isPositiveChange ? '+' : ''}{change}%
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: 'rgba(255, 255, 255, 0.5)',
                ml: 1,
                fontSize: '0.7rem',
                letterSpacing: '0.05em'
              }}
            >
              {timeframe}
            </Typography>
          </Box>
        )}
      </CardContent>
    </StyledCard>
  );
}; 

export const PropertyMetrics: React.FC = () => {
  return (
    <div className="property-metrics">
      <MetricsCard 
        title="Total Items"
        value={150}
        change={5.2}
      />
      <MetricsCard 
        title="Total Value"
        value="$1.2M"
        change={-2.1}
      />
      <MetricsCard 
        title="Serviceability"
        value="98%"
        change={0.5}
      />
    </div>
  );
};

export default PropertyMetrics; 