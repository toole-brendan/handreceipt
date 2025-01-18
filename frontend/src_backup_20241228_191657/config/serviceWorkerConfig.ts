export const SW_CONFIG = {
  CACHE_NAMES: {
    STATIC: 'static-assets-v1',
    DYNAMIC: 'dynamic-content-v1',
    API: 'api-cache-v1'
  },
  API_CACHE_DURATION: 5 * 60, // 5 minutes
  STATIC_CACHE_DURATION: 30 * 24 * 60 * 60, // 30 days
  MAX_API_ENTRIES: 50,
  OFFLINE_PAGE: '/offline.html'
}; 