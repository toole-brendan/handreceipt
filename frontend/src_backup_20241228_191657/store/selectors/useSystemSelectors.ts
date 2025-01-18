import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Alert, SystemHealth } from '@/features/system/types';

// Memoized base selectors
const selectHealth = (state: RootState) => state.system.health;
const selectMetrics = (state: RootState) => state.system.metrics;
const selectConfig = (state: RootState) => state.system.config;
const selectAlerts = (state: RootState) => state.system.alerts;

// Memoized derived selectors
export const selectAlertsBySeverity = createSelector(
  [selectAlerts, (_, severity: Alert['severity']) => severity],
  (alerts, severity) => alerts.filter((alert) => alert.severity === severity)
);

export const selectServiceStatuses = createSelector(
  [selectHealth],
  (health): Record<string, SystemHealth['status']> => {
    if (!health) return {};
    return Object.entries(health.services).reduce((acc, [service, data]) => ({
      ...acc,
      [service]: data.status === 'up' ? 'healthy' : 'down'
    }), {});
  }
);

export const selectSystemStatus = createSelector(
  [selectHealth],
  (health): SystemHealth['status'] => health?.status || 'down'
);

export const selectActiveFeatures = createSelector(
  [selectConfig],
  (config) => {
    if (!config) return [];
    return Object.entries(config.features)
      .filter(([_, enabled]) => enabled)
      .map(([feature]) => feature);
  }
);

// Custom hooks
export const useSystemHealth = () => useSelector(selectHealth);
export const useSystemMetrics = () => useSelector(selectMetrics);
export const useSystemConfig = () => useSelector(selectConfig);
export const useAlerts = () => useSelector(selectAlerts);
export const useAlertsBySeverity = (severity: Alert['severity']) => 
  useSelector((state: RootState) => selectAlertsBySeverity(state, severity));
export const useServiceStatuses = () => useSelector(selectServiceStatuses);
export const useSystemStatus = () => useSelector(selectSystemStatus);
export const useActiveFeatures = () => useSelector(selectActiveFeatures);

// Type-safe alert filtering hook
export const useFilteredAlerts = (options: {
  severity?: Alert['severity'];
  source?: string;
  timeRange?: { start: string; end: string };
}) => {
  return useSelector(createSelector(
    [selectAlerts],
    (alerts) => alerts.filter((alert) => {
      const matchesSeverity = !options.severity || alert.severity === options.severity;
      const matchesSource = !options.source || alert.source === options.source;
      const matchesTimeRange = !options.timeRange || (
        new Date(alert.timestamp) >= new Date(options.timeRange.start) &&
        new Date(alert.timestamp) <= new Date(options.timeRange.end)
      );
      return matchesSeverity && matchesSource && matchesTimeRange;
    })
  ));
}; 