// frontend/src/services/errorTracking.ts

interface ErrorTrackingConfig {
  environment: string;
  release?: string;
}

export const initializeErrorTracking = async (config: ErrorTrackingConfig) => {
  console.log('Error tracking initialized for', config.environment);
}; 