// frontend/src/pages/property/personnel-property/UnitList.tsx
import React from 'react';
import { Unit } from '@/types/personnel';
import { useUnits } from '@/hooks';
import '@/ui/styles/components/property/unit-card.css';

interface UnitListProps {
  onUnitSelect: (unitId: string) => void;
  selectedUnit: string | null;
}

export const UnitList: React.FC<UnitListProps> = ({ onUnitSelect, selectedUnit }) => {
  const { units, loading, error } = useUnits();

  if (loading) return <div>Loading units...</div>;
  if (error) return <div>Error loading units</div>;

  return (
    <div className="unit-list">
      <h3>Unit Structure</h3>
      <div className="unit-tree">
        {/* Company HQ */}
        <div className="unit-group company">
          <div 
            className={`unit-card hq ${selectedUnit === 'HHC' ? 'selected' : ''}`}
            onClick={() => onUnitSelect('HHC')}
          >
            <h4>HHC</h4>
            <div className="unit-stats">
              <span className="personnel-count">35 PAX</span>
              <span className="equipment-count">245 Items</span>
            </div>
            <div className="unit-alerts">
              <span className="alert-badge sensitive">5 Sensitive</span>
            </div>
          </div>

          {/* Platoons */}
          <div className="platoons">
            {/* 1st Platoon */}
            <div className="unit-group platoon">
              <div 
                className={`unit-card ${selectedUnit === '1PLT' ? 'selected' : ''}`}
                onClick={() => onUnitSelect('1PLT')}
              >
                <h4>1st Platoon</h4>
                <div className="unit-stats">
                  <span className="personnel-count">42 PAX</span>
                  <span className="equipment-count">320 Items</span>
                </div>
                <div className="unit-alerts">
                  <span className="alert-badge sensitive">8 Sensitive</span>
                  <span className="alert-badge pending">2 Pending</span>
                </div>
              </div>

              {/* Squads */}
              <div className="squads">
                <div 
                  className={`unit-card squad ${selectedUnit === '1PLT-1SQD' ? 'selected' : ''}`}
                  onClick={() => onUnitSelect('1PLT-1SQD')}
                >
                  <h5>1st Squad</h5>
                  <span className="personnel-count">9 PAX</span>
                </div>
                <div 
                  className={`unit-card squad ${selectedUnit === '1PLT-2SQD' ? 'selected' : ''}`}
                  onClick={() => onUnitSelect('1PLT-2SQD')}
                >
                  <h5>2nd Squad</h5>
                  <span className="personnel-count">9 PAX</span>
                </div>
                <div 
                  className={`unit-card squad ${selectedUnit === '1PLT-3SQD' ? 'selected' : ''}`}
                  onClick={() => onUnitSelect('1PLT-3SQD')}
                >
                  <h5>3rd Squad</h5>
                  <span className="personnel-count">9 PAX</span>
                </div>
                <div 
                  className={`unit-card squad ${selectedUnit === '1PLT-WPN' ? 'selected' : ''}`}
                  onClick={() => onUnitSelect('1PLT-WPN')}
                >
                  <h5>Weapons Squad</h5>
                  <span className="personnel-count">9 PAX</span>
                </div>
              </div>
            </div>

            {/* 2nd Platoon */}
            <div className="unit-group platoon">
              <div 
                className={`unit-card ${selectedUnit === '2PLT' ? 'selected' : ''}`}
                onClick={() => onUnitSelect('2PLT')}
              >
                <h4>2nd Platoon</h4>
                <div className="unit-stats">
                  <span className="personnel-count">42 PAX</span>
                  <span className="equipment-count">315 Items</span>
                </div>
                <div className="unit-alerts">
                  <span className="alert-badge sensitive">8 Sensitive</span>
                </div>
              </div>
              {/* Similar squad structure as 1st Platoon */}
            </div>

            {/* 3rd Platoon */}
            <div className="unit-group platoon">
              <div 
                className={`unit-card ${selectedUnit === '3PLT' ? 'selected' : ''}`}
                onClick={() => onUnitSelect('3PLT')}
              >
                <h4>3rd Platoon</h4>
                <div className="unit-stats">
                  <span className="personnel-count">42 PAX</span>
                  <span className="equipment-count">318 Items</span>
                </div>
                <div className="unit-alerts">
                  <span className="alert-badge sensitive">8 Sensitive</span>
                  <span className="alert-badge overdue">1 Overdue</span>
                </div>
              </div>
              {/* Similar squad structure as 1st Platoon */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitList;