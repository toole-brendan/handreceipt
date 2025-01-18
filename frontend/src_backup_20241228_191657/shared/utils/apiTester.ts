import { api } from '@/services/api';
import { wsService } from '@/services/websocket';

export const testApiConnections = async () => {
  console.group('API Connection Tests');
  
  try {
    // Test health endpoint
    console.log('Testing API health...');
    const health = await api.testConnection();
    console.log('Health check:', health ? '✅' : '❌');

    // Test assets endpoint
    console.log('Testing assets endpoint...');
    const assets = await api.getAssets();
    console.log('Assets retrieved:', assets.success ? '✅' : '❌');

    // Test WebSocket
    console.log('Testing WebSocket...');
    wsService.connect();
    
    // Create a promise that resolves on connection
    const wsTest = new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error('WebSocket connection timeout')), 5000);
      
      const ws = new WebSocket('ws://localhost:8080/ws');
      ws.onopen = () => {
        ws.close();
        resolve(true);
      };
      ws.onerror = () => reject(new Error('WebSocket connection failed'));
    });

    await wsTest;
    console.log('WebSocket connection: ✅');

  } catch (error) {
    console.error('Test failed:', error);
  }
  
  console.groupEnd();
};

// Add specific endpoint tests
export const testEndpoint = async (endpoint: string) => {
  try {
    const response = await fetch(`/api/${endpoint}`);
    const data = await response.json();
    console.log(`Endpoint ${endpoint}:`, data);
    return data;
  } catch (error) {
    console.error(`Endpoint ${endpoint} failed:`, error);
    return null;
  }
}; 