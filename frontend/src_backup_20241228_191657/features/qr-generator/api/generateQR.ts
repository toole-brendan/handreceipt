import { NewItemFormData, GeneratedQR } from '../types/qr.types';

export const generateQR = async (data: NewItemFormData): Promise<GeneratedQR> => {
  const response = await fetch('/api/v1/qr/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to generate QR code');
  }

  return response.json();
}; 