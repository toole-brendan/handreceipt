export interface NewItemFormData {
  name: string;
  serialNumber: string;
  category: string;
  location: string;
  value: string;
  condition: string;
  notes: string;
  isSensitive: boolean;
}

export interface Item {
  id: string;
  name: string;
  serialNumber: string;
  category: string;
  location: string;
}

export interface GeneratedQR {
  id: string;
  data: string;
  itemName: string;
  serialNumber: string;
  createdAt: string;
}

export interface RosterItem {
  name: string;
  serialNumber: string;
  category?: string;
  location?: string;
  value?: string;
}

export type GenerationMethod = 'new' | 'single' | 'bulk' | 'roster'; 