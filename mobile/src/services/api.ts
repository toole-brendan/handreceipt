import axios, { AxiosInstance, AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import HandReceiptModule from '../native/HandReceiptMobile';
import { Transfer } from '../types/sync';
import { Property } from '../types/scanner';
import { API_URL } from '@env';

class ApiClient {
  private api: AxiosInstance;
  private offlineQueue: Array<{
    method: string;
    endpoint: string;
    data?: any;
  }> = [];

  constructor() {
    this.api = axios.create({
      baseURL: API_URL || 'http://localhost:8080',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor for auth token
    this.api.interceptors.request.use(async (config) => {
      const token = await AsyncStorage.getItem('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Add response interceptor for token refresh
    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          try {
            // Try to refresh token using native module
            const user = await HandReceiptModule.getCurrentUser();
            if (user) {
              // Retry original request
              return this.api.request(error.config);
            }
          } catch (refreshError) {
            // Handle refresh failure
            await AsyncStorage.removeItem('auth_token');
            throw refreshError;
          }
        }
        throw error;
      }
    );

    // Initialize offline queue processing
    this.initOfflineSync();
  }

  private async initOfflineSync() {
    NetInfo.addEventListener(async (state) => {
      if (state.isConnected && this.offlineQueue.length > 0) {
        await this.processOfflineQueue();
      }
    });
  }

  private async processOfflineQueue() {
    const queue = [...this.offlineQueue];
    this.offlineQueue = [];

    for (const request of queue) {
      try {
        await this.api.request({
          method: request.method,
          url: request.endpoint,
          data: request.data,
        });
      } catch (error: unknown) {
        console.error('Failed to process offline request:', error);
        this.offlineQueue.push(request);
      }
    }
  }

  private async handleOfflineRequest(
    method: string,
    endpoint: string,
    data?: any
  ) {
    const isConnected = (await NetInfo.fetch()).isConnected;
    
    if (!isConnected) {
      this.offlineQueue.push({ method, endpoint, data });
      await AsyncStorage.setItem(
        'offline_queue',
        JSON.stringify(this.offlineQueue)
      );
      throw new Error('Offline mode: Request queued');
    }
  }

  // Property APIs
  async getProperties(): Promise<Property[]> {
    try {
      await this.handleOfflineRequest('GET', '/api/property');
      const response = await this.api.get('/api/property');
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        // Return cached data if offline
        const cached = await AsyncStorage.getItem('cached_properties');
        if (cached) return JSON.parse(cached);
      }
      throw error;
    }
  }

  async transferProperty(transfer: Transfer): Promise<void> {
    try {
      await this.handleOfflineRequest('POST', '/api/property/transfer', transfer);
      await HandReceiptModule.storeTransfer(transfer);
      await this.api.post('/api/property/transfer', transfer);
    } catch (error: unknown) {
      // Queue for later if offline
      if (error instanceof Error && error.message === 'Offline mode: Request queued') {
        await HandReceiptModule.storeTransfer(transfer);
      }
      throw error;
    }
  }

  // Sync APIs
  async syncOfflineData(): Promise<void> {
    try {
      const result = await HandReceiptModule.syncPendingTransfers();
      console.log('Sync result:', result);
    } catch (error: unknown) {
      console.error('Sync failed:', error);
      throw error;
    }
  }
}

export const api = new ApiClient();
export default api; 