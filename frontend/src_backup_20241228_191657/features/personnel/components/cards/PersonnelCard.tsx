import React, { useState } from 'react';
import { Card, Space, Button, Badge } from 'antd';
import type { Soldier } from '@/types/personnel';
import EquipmentTable from './EquipmentTable';

interface PersonnelCardProps {
  soldier: Soldier;
  onHandReceipt: (soldierId: string) => void;
  onViewProfile: (soldierId: string) => void;
  onTransferEquipment: (equipmentId: string) => void;
  onViewEquipmentDetails: (equipmentId: string) => void;
}

const PersonnelCard: React.FC<PersonnelCardProps> = ({
  soldier,
  onHandReceipt,
  onViewProfile,
  onTransferEquipment,
  onViewEquipmentDetails,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Card className="personnel-card">
      <div className="personnel-card-header" onClick={toggleExpand}>
        <Space align="center" className="personnel-info">
          <i className="material-icons expand-icon">
            {isExpanded ? 'expand_more' : 'chevron_right'}
          </i>
          <div className="soldier-details">
            <div className="primary-details">
              <span className="rank-name">
                {soldier.rank} {soldier.lastName}, {soldier.firstName}
              </span>
            </div>
            <div className="secondary-details">
              <span className="position">{soldier.position}</span>
              <span className="separator">•</span>
              <span className="section">{soldier.section}</span>
            </div>
          </div>
        </Space>

        <Space size="large" className="personnel-stats">
          <div className="stat-item">
            <span className="stat-label">Total Items</span>
            <span className="stat-value">{soldier.stats.totalItems}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Sensitive Items</span>
            <span className="stat-value">{soldier.stats.sensitiveItems}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Last Inventory</span>
            <span className="stat-value">
              {new Date(soldier.stats.lastInventoryDate).toLocaleDateString()}
            </span>
          </div>
        </Space>

        <Space className="action-buttons">
          <Button
            type="text"
            onClick={(e) => {
              e.stopPropagation();
              onHandReceipt(soldier.id);
            }}
          >
            <i className="material-icons">description</i>
            Hand Receipt
          </Button>
          <Button
            type="text"
            onClick={(e) => {
              e.stopPropagation();
              onViewProfile(soldier.id);
            }}
          >
            <i className="material-icons">person</i>
            View Profile
          </Button>
        </Space>
      </div>

      {isExpanded && (
        <div className="equipment-section">
          <EquipmentTable
            equipment={soldier.equipment}
            onTransfer={onTransferEquipment}
            onViewDetails={onViewEquipmentDetails}
          />
        </div>
      )}
    </Card>
  );
};

export default PersonnelCard; 