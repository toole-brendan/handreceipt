import React from 'react';
import { useUnitInventory } from '../../hooks/useUnitInventory';
import { DataTable } from '@/shared/components/data-table';

export const SensitiveItems: React.FC = () => {
  const { items, loading } = useUnitInventory();
  const sensitiveItems = items.filter(item => item.sensitive);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <DataTable
        data={sensitiveItems}
        columns={[
          { header: 'NSN', accessorKey: 'nsn' },
          { header: 'Name', accessorKey: 'name' },
          { header: 'Serial #', accessorKey: 'serialNumber' },
          { header: 'Location', accessorKey: 'location' },
          { header: 'Assigned To', accessorKey: 'assignedTo' },
          { header: 'Last Inventory', accessorKey: 'lastInventoryDate' },
        ]}
      />
    </div>
  );
};

export default SensitiveItems; 