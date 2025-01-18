export interface MaintenanceRequest {
  id: string;
  itemId: string;
  itemName: string;
  requestType: 'repair' | 'inspection' | 'replacement';
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'approved' | 'in_progress' | 'completed' | 'rejected';
  description: string;
  submittedBy: string;
  submittedAt: string;
  updatedAt: string;
  assignedTo?: string;
  completedAt?: string;
  notes?: string;
}

export interface RequestFormData {
  itemId: string;
  requestType: MaintenanceRequest['requestType'];
  priority: MaintenanceRequest['priority'];
  description: string;
  notes?: string;
}

export interface StatusUpdate {
  requestId: string;
  status: MaintenanceRequest['status'];
  notes?: string;
  assignedTo?: string;
}

export interface TimelineEvent {
  id: string;
  requestId: string;
  type: 'status_change' | 'note_added' | 'assignment_change';
  timestamp: string;
  details: string;
  actor: string;
} 