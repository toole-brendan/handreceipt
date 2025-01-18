import { api } from '@/services/api';

interface VerificationSubmission {
  itemId: string;
  serialNumber: string;
  verifiedBy: string;
  location: string;
  notes?: string;
  timestamp: string;
}

interface VerificationResponse {
  success: boolean;
  message: string;
  verificationId: string;
  timestamp: string;
  nextVerificationDue: string;
}

export const submitVerification = async (
  data: VerificationSubmission
): Promise<VerificationResponse> => {
  return api.post<VerificationResponse>('/sensitive-items/verify', data);
}; 