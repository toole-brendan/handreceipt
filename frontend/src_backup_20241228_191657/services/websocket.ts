// frontend/src/services/websocket.ts

import { WebSocketMessage, WebSocketMessageType } from '@/types/websocket';

export interface WebSocketConfig {
  url: string;
  maxReconnectAttempts?: number;
  reconnectDelay?: number;
}

export class WebSocketError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'WebSocketError';
  }
}

type WebSocketCallback<T> = (data: T) => void;

export class WebSocketService {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts: number;
  private reconnectDelay: number;
  private callbacks: Map<WebSocketMessageType, WebSocketCallback<any>[]> = new Map();

  constructor(private config: WebSocketConfig) {
    this.maxReconnectAttempts = config.maxReconnectAttempts || 5;
    this.reconnectDelay = config.reconnectDelay || 1000;
  }

  connect(): void {
    try {
      this.ws = new WebSocket(this.config.url);
      
      this.ws.onopen = () => {
        console.log('WebSocket connected');
        this.reconnectAttempts = 0;
      };

      this.ws.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data);
          const callbacks = this.callbacks.get(message.type) || [];
          callbacks.forEach(callback => {
            try {
              callback(message.payload);
            } catch (error) {
              console.error('WebSocket callback error:', error);
            }
          });
        } catch (error) {
          console.error('WebSocket message parsing error:', error);
        }
      };

      this.ws.onclose = () => {
        console.log('WebSocket disconnected');
        this.attemptReconnect();
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        throw new WebSocketError('WebSocket connection error', 'WS_CONNECTION_ERROR');
      };
    } catch (error) {
      console.error('WebSocket connection error:', error);
      throw new WebSocketError('Failed to establish WebSocket connection', 'WS_INIT_ERROR');
    }
  }

  private attemptReconnect(): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = this.reconnectDelay * this.reconnectAttempts;
      
      console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts}) in ${delay}ms`);
      
      setTimeout(() => {
        try {
          this.connect();
        } catch (error) {
          console.error('WebSocket reconnection failed:', error);
        }
      }, delay);
    } else {
      throw new WebSocketError('Max reconnection attempts reached', 'WS_MAX_RECONNECT');
    }
  }

  subscribe<T>(type: WebSocketMessageType, callback: WebSocketCallback<T>): void {
    if (!this.callbacks.has(type)) {
      this.callbacks.set(type, []);
    }
    this.callbacks.get(type)?.push(callback as WebSocketCallback<any>);
  }

  unsubscribe<T>(type: WebSocketMessageType, callback: WebSocketCallback<T>): void {
    const callbacks = this.callbacks.get(type) || [];
    const index = callbacks.indexOf(callback as WebSocketCallback<any>);
    if (index > -1) {
      callbacks.splice(index, 1);
    }
  }

  send(message: WebSocketMessage): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      try {
        this.ws.send(JSON.stringify(message));
      } catch (error) {
        throw new WebSocketError('Failed to send message', 'WS_SEND_ERROR');
      }
    } else {
      throw new WebSocketError('WebSocket is not connected', 'WS_NOT_CONNECTED');
    }
  }

  disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
      this.callbacks.clear();
    }
  }
}

// Create singleton instance
export const wsService = new WebSocketService({
  url: `ws://${window.location.host}/ws`,
  maxReconnectAttempts: 5,
  reconnectDelay: 1000
}); 