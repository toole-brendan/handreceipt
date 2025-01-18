import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { PropertyList } from './PropertyList';
import { PropertySummary } from './PropertySummary';
import { PropertyItem } from './PropertyCard';
import { styled } from '@mui/material/styles';
import { Typography, Paper, LinearProgress, Box } from '@mui/material';
import { Container } from '@/components/layout/mui/Container';
import { Stack } from '@/components/layout/mui/Stack';

const Section = styled(Paper)(({ theme }) => ({
  background: '#121212',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(3),
  border: '1px solid rgba(255, 255, 255, 0.1)',
  transition: 'all 0.2s ease',
  minWidth: 200,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  elevation: 0,
  '&:hover': {
    border: '1px solid rgba(255, 255, 255, 0.2)',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)',
  }
}));

const StatusBadge = styled('span')<{ color?: string }>(({ color = '#4CAF50' }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  padding: '4px 8px',
  borderRadius: '4px',
  fontSize: '0.75rem',
  fontWeight: 500,
  color: color,
  border: `1px solid ${color}`,
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
}));

const MetricsGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const MetricBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  padding: theme.spacing(2),
  background: 'rgba(255, 255, 255, 0.02)',
  borderRadius: theme.shape.borderRadius,
  border: '1px solid rgba(255, 255, 255, 0.05)',
}));

const ServiceabilityBar = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 4,
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  '& .MuiLinearProgress-bar': {
    backgroundColor: '#FF3B3B',
  },
}));

// Mock data (later move to a data fetching hook)
const mockItems: PropertyItem[] = [
  {
    id: '1',
    name: 'M4 Carbine',
    serialNumber: 'M4-123456',
    nsn: '1005-01-231-0973',
    status: 'serviceable',
    category: 'Weapons',
    value: 749.00,
    lastInventory: new Date('2024-01-25')
  },
  {
    id: '2',
    name: 'ACOG Scope',
    serialNumber: 'TA31-789012',
    nsn: '1240-01-412-6608',
    status: 'serviceable',
    category: 'Optics',
    value: 1298.00,
    lastInventory: new Date('2024-01-25')
  },
  {
    id: '3',
    name: 'PVS-14 Night Vision',
    serialNumber: 'PVS-345678',
    nsn: '5855-01-432-0524',
    status: 'damaged',
    category: 'Optics',
    value: 3600.00,
    notes: 'Battery housing damaged, needs repair',
    lastInventory: new Date('2024-01-25')
  }
];

export const PropertyView: React.FC = () => {
  const { currentUser } = useAuth();

  // Calculate summary statistics
  const totalValue = mockItems.reduce((sum, item) => sum + item.value, 0);
  const serviceableItems = mockItems.filter(item => item.status === 'serviceable').length;
  const serviceablePercentage = Math.round((serviceableItems / mockItems.length) * 100);

  const handleEdit = (id: string) => {
    console.log('Edit item:', id);
  };

  const handleDelete = (id: string) => {
    console.log('Delete item:', id);
  };

  const handleViewHistory = (id: string) => {
    console.log('View history:', id);
  };

  const handleGenerateQR = (id: string) => {
    console.log('Generate QR:', id);
  };

  return (
    <Container>
      <Stack spacing={3}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography
            variant="h4"
            component="h1"
          >
            My Property
          </Typography>
          <Box>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', textAlign: 'right' }}>
              CPT Test Officer
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', textAlign: 'right', opacity: 0.7 }}>
              OFFICER
            </Typography>
          </Box>
        </Box>

        <Section>
          <Typography
            variant="h1"
            component="h2"
            sx={{
              marginBottom: theme => theme.spacing(3),
              position: 'relative',
              paddingBottom: theme => theme.spacing(1),
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '30px',
                height: '1px',
                background: 'rgba(255, 255, 255, 0.7)',
              }
            }}
          >
            Property Overview
          </Typography>
          <MetricsGrid>
            <MetricBox>
              <Typography variant="subtitle2" sx={{ color: 'rgba(255, 255, 255, 0.7)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Total Items
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="h3" sx={{ fontSize: '2rem', fontWeight: 400, color: '#FFFFFF', letterSpacing: '0.02em' }}>
                  3
                </Typography>
              </Box>
              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                In inventory
              </Typography>
            </MetricBox>
            
            <MetricBox>
              <Typography variant="subtitle2" sx={{ color: 'rgba(255, 255, 255, 0.7)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Total Value
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="h3" sx={{ fontSize: '2rem', fontWeight: 400, color: '#FFFFFF', letterSpacing: '0.02em' }}>
                  ${totalValue.toLocaleString()}
                </Typography>
                <StatusBadge sx={{ backgroundColor: 'rgba(76, 175, 80, 0.1)' }}>
                  VERIFIED
                </StatusBadge>
              </Box>
            </MetricBox>
            
            <MetricBox>
              <Typography variant="subtitle2" sx={{ color: 'rgba(255, 255, 255, 0.7)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Serviceable Items
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="h3" sx={{ fontSize: '2rem', fontWeight: 400, color: '#FFFFFF', letterSpacing: '0.02em' }}>
                  {serviceableItems} / {mockItems.length}
                </Typography>
                <StatusBadge sx={{ backgroundColor: 'rgba(255, 215, 0, 0.1)', color: '#FFD700', borderColor: '#FFD700' }}>
                  PENDING
                </StatusBadge>
              </Box>
              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                {serviceablePercentage}% of total
              </Typography>
            </MetricBox>
            
            <MetricBox>
              <Typography variant="subtitle2" sx={{ color: 'rgba(255, 255, 255, 0.7)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Issues
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="h3" sx={{ fontSize: '2rem', fontWeight: 400, color: '#FFFFFF', letterSpacing: '0.02em' }}>
                  1
                </Typography>
                <StatusBadge sx={{ backgroundColor: 'rgba(255, 215, 0, 0.1)', color: '#FFD700', borderColor: '#FFD700' }}>
                  PENDING
                </StatusBadge>
              </Box>
              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                0 missing, 1 damaged
              </Typography>
            </MetricBox>
          </MetricsGrid>
          
          <Box sx={{ mt: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                Serviceability Rate
              </Typography>
              <Typography variant="caption" sx={{ color: '#FF3B3B' }}>
                {serviceablePercentage}%
              </Typography>
            </Box>
            <ServiceabilityBar variant="determinate" value={serviceablePercentage} />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                Last inventory: 1/24/2024
              </Typography>
            </Box>
          </Box>
        </Section>
        
        <Section>
          <Typography
            variant="h1"
            component="h2"
            sx={{
              marginBottom: theme => theme.spacing(3),
              position: 'relative',
              paddingBottom: theme => theme.spacing(1),
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '30px',
                height: '1px',
                background: 'rgba(255, 255, 255, 0.7)',
              }
            }}
          >
            Assigned Property
          </Typography>
          <PropertyList 
            items={mockItems}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onViewHistory={handleViewHistory}
            onGenerateQR={handleGenerateQR}
          />
        </Section>
      </Stack>
    </Container>
  );
}; 