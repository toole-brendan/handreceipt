interface AnalyticsConfig {
  enabled: boolean;
}

export const initializeAnalytics = async (config: AnalyticsConfig) => {
  if (config.enabled) {
    // Initialize analytics in production
    console.log('Analytics initialized');
  }
}; 