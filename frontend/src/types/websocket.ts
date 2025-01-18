export type WebSocketMessageType = 
  | 'PROPERTY_UPDATED'
  | 'TRANSFER_CREATED'
  | 'TRANSFER_COMPLETED'
  | 'VERIFICATION_REQUESTED'
  | 'VERIFICATION_COMPLETED'
  | 'ERROR';

export interface WebSocketMessage {
  type: WebSocketMessageType;
  payload: any;
  timestamp?: string;
} 