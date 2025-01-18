// src/ui/components/admin/SystemConfiguration.tsx

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import '../../../ui/styles/system-configuration.css';

interface SystemConfig {
  security: SecurityConfig;
  network: NetworkConfig;
  audit: AuditConfig;
  backup: BackupConfig;
}

interface ConfigSection {
  [key: string]: any;
}

interface SecurityConfig extends ConfigSection {
  mfaEnabled: boolean;
  passwordPolicy: {
    minLength: number;
    requireSpecialChars: boolean;
    requireNumbers: boolean;
    expiryDays: number;
  };
  sessionTimeout: number;
}

interface NetworkConfig {
  maxConcurrentSessions: number;
  apiRateLimit: number;
  allowedDomains: string[];
}

interface AuditConfig {
  logRetentionDays: number;
  detailedLogging: boolean;
  criticalEventsOnly: boolean;
}

interface BackupConfig {
  frequency: 'hourly' | 'daily' | 'weekly';
  retentionPeriod: number;
  encryptBackups: boolean;
}

// Add type guard functions
const isSecurityConfig = (config: any): config is SecurityConfig => {
  return 'mfaEnabled' in config;
};

const isNetworkConfig = (config: any): config is NetworkConfig => {
  return 'maxConcurrentSessions' in config;
};

const isAuditConfig = (config: any): config is AuditConfig => {
  return 'logRetentionDays' in config;
};

const isBackupConfig = (config: any): config is BackupConfig => {
  return 'frequency' in config;
};

export const SystemConfiguration: React.FC = () => {
  const [config, setConfig] = useState<SystemConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDirty, setIsDirty] = useState(false);
  const { classificationLevel } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    fetchConfig();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classificationLevel]);

  const fetchConfig = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/system/config', {
        headers: {
          'Classification-Level': classificationLevel,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch system configuration');
      }

      const data = await response.json();
      setConfig(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleConfigChange = (
    section: keyof SystemConfig,
    subsection: string,
    value: any
  ) => {
    if (!config) return;

    setConfig((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [subsection]: value,
        },
      };
    });
    setIsDirty(true);
  };

  const handleNestedConfigChange = (
    section: keyof SystemConfig,
    subsection: string,
    key: string,
    value: any
  ) => {
    if (!config) return;

    setConfig((prev) => {
      if (!prev) return prev;
      const sectionConfig = prev[section] as ConfigSection;
      
      return {
        ...prev,
        [section]: {
          ...sectionConfig,
          [subsection]: {
            ...sectionConfig[subsection],
            [key]: value,
          },
        },
      };
    });
    setIsDirty(true);
  };

  const handleArrayChange = (
    section: keyof SystemConfig,
    subsection: string,
    value: string
  ) => {
    const newArray = value.split(',').map((item) => item.trim());
    handleConfigChange(section, subsection, newArray);
  };

  const saveConfig = async () => {
    if (!config) return;

    try {
      const response = await fetch('/api/admin/system/config', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Classification-Level': classificationLevel,
        },
        body: JSON.stringify(config),
      });

      if (!response.ok) {
        throw new Error('Failed to save configuration');
      }

      setIsDirty(false);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to save configuration');
    }
  };

  if (loading) return <div className="loading">Loading configuration...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!config) return <div className="error-message">No configuration found</div>;

  return (
    <div className="system-configuration">
      <header className="admin-header">
        <h2>System Configuration</h2>
        <button className="btn-primary" onClick={saveConfig} disabled={!isDirty}>
          Save Changes
        </button>
      </header>

      <div className="config-sections-container">
        <div className="config-sections">
          {/* Security Section */}
          <section className="config-section">
            <h3>Security Settings</h3>
            <div className="config-grid">
              <div className="config-item">
                <label>
                  <input
                    type="checkbox"
                    checked={config.security.mfaEnabled}
                    onChange={(e) =>
                      handleConfigChange('security', 'mfaEnabled', e.target.checked)
                    }
                  />
                  Enable MFA
                </label>
              </div>

              <div className="config-item">
                <label>Password Minimum Length</label>
                <input
                  type="number"
                  value={config.security.passwordPolicy.minLength}
                  onChange={(e) =>
                    handleNestedConfigChange(
                      'security',
                      'passwordPolicy',
                      'minLength',
                      parseInt(e.target.value)
                    )
                  }
                  min="8"
                  max="32"
                />
              </div>

              <div className="config-item">
                <label>
                  <input
                    type="checkbox"
                    checked={config.security.passwordPolicy.requireSpecialChars}
                    onChange={(e) =>
                      handleNestedConfigChange(
                        'security',
                        'passwordPolicy',
                        'requireSpecialChars',
                        e.target.checked
                      )
                    }
                  />
                  Require Special Characters
                </label>
              </div>

              <div className="config-item">
                <label>
                  <input
                    type="checkbox"
                    checked={config.security.passwordPolicy.requireNumbers}
                    onChange={(e) =>
                      handleNestedConfigChange(
                        'security',
                        'passwordPolicy',
                        'requireNumbers',
                        e.target.checked
                      )
                    }
                  />
                  Require Numbers
                </label>
              </div>

              <div className="config-item">
                <label>Password Expiry (days)</label>
                <input
                  type="number"
                  value={config.security.passwordPolicy.expiryDays}
                  onChange={(e) =>
                    handleNestedConfigChange(
                      'security',
                      'passwordPolicy',
                      'expiryDays',
                      parseInt(e.target.value)
                    )
                  }
                  min="30"
                  max="180"
                />
              </div>

              <div className="config-item">
                <label>Session Timeout (minutes)</label>
                <input
                  type="number"
                  value={config.security.sessionTimeout}
                  onChange={(e) =>
                    handleConfigChange('security', 'sessionTimeout', parseInt(e.target.value))
                  }
                  min="5"
                  max="120"
                />
              </div>
            </div>
          </section>

          {/* Network Section */}
          <section className="config-section">
            <h3>Network Settings</h3>
            <div className="config-grid">
              <div className="config-item">
                <label>Max Concurrent Sessions</label>
                <input
                  type="number"
                  value={config.network.maxConcurrentSessions}
                  onChange={(e) =>
                    handleConfigChange(
                      'network',
                      'maxConcurrentSessions',
                      parseInt(e.target.value)
                    )
                  }
                  min="1"
                  max="10"
                />
              </div>

              <div className="config-item">
                <label>API Rate Limit (requests/minute)</label>
                <input
                  type="number"
                  value={config.network.apiRateLimit}
                  onChange={(e) =>
                    handleConfigChange('network', 'apiRateLimit', parseInt(e.target.value))
                  }
                  min="60"
                  max="1000"
                />
              </div>

              <div className="config-item full-width">
                <label>Allowed Domains (comma-separated)</label>
                <input
                  type="text"
                  value={config.network.allowedDomains.join(', ')}
                  onChange={(e) =>
                    handleArrayChange('network', 'allowedDomains', e.target.value)
                  }
                />
              </div>
            </div>
          </section>

          {/* Audit Section */}
          <section className="config-section">
            <h3>Audit Settings</h3>
            <div className="config-grid">
              <div className="config-item">
                <label>Log Retention (days)</label>
                <input
                  type="number"
                  value={config.audit.logRetentionDays}
                  onChange={(e) =>
                    handleConfigChange('audit', 'logRetentionDays', parseInt(e.target.value))
                  }
                  min="30"
                  max="365"
                />
              </div>

              <div className="config-item">
                <label>
                  <input
                    type="checkbox"
                    checked={config.audit.detailedLogging}
                    onChange={(e) =>
                      handleConfigChange('audit', 'detailedLogging', e.target.checked)
                    }
                  />
                  Enable Detailed Logging
                </label>
              </div>

              <div className="config-item">
                <label>
                  <input
                    type="checkbox"
                    checked={config.audit.criticalEventsOnly}
                    onChange={(e) =>
                      handleConfigChange('audit', 'criticalEventsOnly', e.target.checked)
                    }
                  />
                  Log Critical Events Only
                </label>
              </div>
            </div>
          </section>

          {/* Backup Section */}
          <section className="config-section">
            <h3>Backup Settings</h3>
            <div className="config-grid">
              <div className="config-item">
                <label>Backup Frequency</label>
                <select
                  value={config.backup.frequency}
                  onChange={(e) =>
                    handleConfigChange('backup', 'frequency', e.target.value)
                  }
                >
                  <option value="hourly">Hourly</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                </select>
              </div>

              <div className="config-item">
                <label>Retention Period (days)</label>
                <input
                  type="number"
                  value={config.backup.retentionPeriod}
                  onChange={(e) =>
                    handleConfigChange('backup', 'retentionPeriod', parseInt(e.target.value))
                  }
                  min="7"
                  max="365"
                />
              </div>

              <div className="config-item">
                <label>
                  <input
                    type="checkbox"
                    checked={config.backup.encryptBackups}
                    onChange={(e) =>
                      handleConfigChange('backup', 'encryptBackups', e.target.checked)
                    }
                  />
                  Encrypt Backups
                </label>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
