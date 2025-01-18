import React from 'react';
import { Eye } from 'lucide-react';
import { SettingsState, SettingsActions } from '../types/settings.types';

interface AppearanceSettingsProps {
  darkMode: boolean;
  highContrast: boolean;
  fontSize: SettingsState['fontSize'];
  toggleDarkMode: () => void;
  toggleHighContrast: () => void;
  setFontSize: (size: SettingsState['fontSize']) => void;
}

export const AppearanceSettings: React.FC<AppearanceSettingsProps> = ({
  darkMode,
  highContrast,
  fontSize,
  toggleDarkMode,
  toggleHighContrast,
  setFontSize,
}) => {
  return (
    <div className="settings-section">
      <h2 className="settings-section-title">
        <Eye className="icon" />
        Display Settings
      </h2>
      <div className="settings-options">
        <div className="setting-item">
          <label className="setting-label">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={toggleDarkMode}
            />
            Dark Mode
          </label>
        </div>
        <div className="setting-item">
          <label className="setting-label">
            <input
              type="checkbox"
              checked={highContrast}
              onChange={toggleHighContrast}
            />
            High Contrast
          </label>
        </div>
        <div className="setting-item">
          <label className="setting-label">
            Font Size
            <select
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value as SettingsState['fontSize'])}
            >
              <option value="default">Default</option>
              <option value="large">Large</option>
              <option value="xlarge">Extra Large</option>
            </select>
          </label>
        </div>
      </div>
    </div>
  );
}; 