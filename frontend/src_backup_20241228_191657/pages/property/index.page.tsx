import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { PropertyList } from '@/features/property/components/PropertyList';
import { PropertySummary } from '@/features/property/components/PropertySummary';
import { PropertyItem } from '@/features/property/components/PropertyCard';
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

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

const PageContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4)
}));

const PageHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(4)
}));

const PageTitle = styled(Typography)(({ theme }) => ({
  fontSize: '2rem',
  fontWeight: 600,
  color: '#FFFFFF',
  margin: 0
}));

const UserInfo = styled(Typography)(({ theme }) => ({
  color: 'rgba(255, 255, 255, 0.7)'
}));

const ContentContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(4)
}));

const Section = styled(Box)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.05)',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(3)
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.25rem',
  fontWeight: 500,
  color: '#FFFFFF',
  margin: '0 0 1rem 0'
}));

const PropertyPage: React.FC = () => {
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
    <PageContainer>
      <PageHeader>
        <PageTitle variant="h1">My Property</PageTitle>
        <UserInfo>
          {currentUser?.rank} {currentUser?.name}
        </UserInfo>
      </PageHeader>

      <ContentContainer>
        <PropertySummary 
          items={mockItems}
          totalValue={totalValue}
          serviceablePercentage={serviceablePercentage}
          lastInventoryDate={new Date('2024-01-25')}
        />
        
        <Section>
          <SectionTitle variant="h2">Assigned Property</SectionTitle>
          <PropertyList 
            items={mockItems}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onViewHistory={handleViewHistory}
            onGenerateQR={handleGenerateQR}
          />
        </Section>
      </ContentContainer>
    </PageContainer>
  );
};

export default PropertyPage;
