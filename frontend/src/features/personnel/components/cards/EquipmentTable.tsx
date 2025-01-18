import React from 'react';
import { Table, Button, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { Equipment } from '@/types/personnel';

interface EquipmentTableProps {
  equipment: Equipment[];
  onTransfer: (equipmentId: string) => void;
  onViewDetails: (equipmentId: string) => void;
}

const EquipmentTable: React.FC<EquipmentTableProps> = ({
  equipment,
  onTransfer,
  onViewDetails,
}) => {
  const columns: ColumnsType<Equipment> = [
    {
      title: 'NSN',
      dataIndex: 'nsn',
      key: 'nsn',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Serial Number',
      dataIndex: 'serialNumber',
      key: 'serialNumber',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <span className={`status-badge ${status.toLowerCase()}`}>
          {status}
        </span>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="small">
          <Button
            type="text"
            onClick={() => onTransfer(record.id)}
            icon={<i className="material-icons">swap_horiz</i>}
          >
            Transfer
          </Button>
          <Button
            type="text"
            onClick={() => onViewDetails(record.id)}
            icon={<i className="material-icons">visibility</i>}
          >
            View
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={equipment}
      rowKey="id"
      size="small"
      pagination={false}
      className="equipment-table"
    />
  );
};

export default EquipmentTable; 