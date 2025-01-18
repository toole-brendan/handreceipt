import React from 'react';
import { Table, Button, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { AssignedEquipment } from '@/features/personnel/types';

interface EquipmentTableProps {
  equipment: AssignedEquipment[];
  onTransfer: (equipmentId: string) => void;
  onViewDetails: (equipmentId: string) => void;
}

const EquipmentTable: React.FC<EquipmentTableProps> = ({
  equipment,
  onTransfer,
  onViewDetails,
}) => {
  const columns: ColumnsType<AssignedEquipment> = [
    {
      title: 'Item',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: AssignedEquipment) => (
        <Space>
          {record.isSensitive && (
            <i className="material-icons sensitive-item-icon">warning</i>
          )}
          <span>{text}</span>
        </Space>
      ),
    },
    {
      title: 'Serial Number',
      dataIndex: 'serialNumber',
      key: 'serialNumber',
      render: (text: string) => (
        <code className="serial-number">{text}</code>
      ),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Date Assigned',
      dataIndex: 'dateAssigned',
      key: 'dateAssigned',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="small">
          <Button
            type="text"
            onClick={() => onTransfer(record.id)}
          >
            <i className="material-icons">swap_horiz</i>
            Transfer
          </Button>
          <Button
            type="text"
            onClick={() => onViewDetails(record.id)}
          >
            <i className="material-icons">info</i>
            Details
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
      className="equipment-table"
      pagination={false}
      size="small"
    />
  );
};

export default EquipmentTable; 