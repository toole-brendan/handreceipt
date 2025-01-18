import { ApiResponse } from '@/types/shared';

export class ApiClient {
  private baseUrl: string;
  
  constructor(baseUrl: string = '/api') {
    this.baseUrl = baseUrl;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    try {
      console.log(`Making request to: ${this.baseUrl}${endpoint}`);
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers,
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', {
        endpoint,
        error,
      });
      throw error;
    }
  }

  // HTTP Methods
  async get<T>(endpoint: string): Promise<T> {
    const response = await this.request<T>(endpoint, { method: 'GET' });
    return response.data;
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    const response = await this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.data;
  }

  async put<T>(endpoint: string, data: any): Promise<T> {
    const response = await this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return response.data;
  }

  async patch<T>(endpoint: string, data: any): Promise<T> {
    const response = await this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
    return response.data;
  }

  async delete<T>(endpoint: string): Promise<T> {
    const response = await this.request<T>(endpoint, { method: 'DELETE' });
    return response.data;
  }

  async testConnection(): Promise<boolean> {
    try {
      console.log('Testing API connection...');
      const endpoints = ['/health', `${this.baseUrl}/v1/health`];
      
      for (const endpoint of endpoints) {
        try {
          console.log(`Trying health check at: ${endpoint}`);
          const response = await fetch(endpoint);
          console.log(`Response from ${endpoint}:`, response);
          
          if (response.ok) {
            const data = await response.json();
            console.log('Health check response data:', data);
            
            if (data.success && data.data === "Service is healthy") {
              return true;
            }
          }
        } catch (error) {
          console.warn(`Failed to check ${endpoint}:`, error);
        }
      }
      
      throw new Error('All health check endpoints failed');
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }
}

export const api = new ApiClient(); 