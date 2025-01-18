import { RosterItem, GeneratedQR } from '../types/qr.types';

export const processRoster = async (file: File): Promise<GeneratedQR[]> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('/api/v1/qr/process-roster', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to process roster file');
  }

  return response.json();
}; 