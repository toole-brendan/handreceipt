interface VerificationChecklist {
  id: string;
  label: string;
  required: boolean;
  checked: boolean;
}

export const validateVerificationForm = (checklist: VerificationChecklist[]): boolean => {
  return checklist
    .filter(item => item.required)
    .every(item => item.checked);
};

export const formatVerificationStatus = (status: string): string => {
  const statusMap = {
    pending: 'Pending Review',
    approved: 'Verification Approved',
    rejected: 'Verification Rejected',
    incomplete: 'Verification Incomplete'
  };
  return statusMap[status as keyof typeof statusMap] || status;
};

export const getVerificationProgress = (checklist: VerificationChecklist[]): number => {
  if (!checklist.length) return 0;
  const completedItems = checklist.filter(item => item.checked).length;
  return Math.round((completedItems / checklist.length) * 100);
};

export const formatVerificationDate = (date: string): string => {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const validateImageFile = (file: File): boolean => {
  const validTypes = ['image/jpeg', 'image/png', 'image/heic'];
  const maxSize = 10 * 1024 * 1024; // 10MB
  return validTypes.includes(file.type) && file.size <= maxSize;
};

export const getImagePreviewUrl = (file: File): string => {
  return URL.createObjectURL(file);
};

export const filterVerificationTasks = (
  tasks: any[],
  filters: { status?: string; priority?: string }
): any[] => {
  return tasks.filter(task => {
    if (filters.status && task.status !== filters.status) return false;
    if (filters.priority && task.priority !== filters.priority) return false;
    return true;
  });
};

export const getVerificationTaskPriority = (dueDate: Date): 'low' | 'medium' | 'high' | 'critical' => {
  const daysUntilDue = Math.ceil((dueDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  if (daysUntilDue < 0) return 'critical';
  if (daysUntilDue <= 1) return 'high';
  if (daysUntilDue <= 3) return 'medium';
  return 'low';
}; 