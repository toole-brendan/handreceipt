export interface HistoricalItem {
  id: string;
  name: string;
  serialNumber: string;
  category: string;
  dateReceived: string;
  receivedFrom: string;
  dateReturned: string;
  returnedTo: string;
  handReceipt: string;
}

export interface HistoricalRecord {
  items: HistoricalItem[];
  total: number;
  page: number;
  limit: number;
}

export interface HistoricalFilters {
  search?: string;
  category?: string;
  year?: string;
}

export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}

export interface PropertyTransfer {
  id: string;
  transferDate: string;
  propertyId: string;
  propertyName: string;
  fromPerson: string;
  toPerson: string;
  status: string;
} 