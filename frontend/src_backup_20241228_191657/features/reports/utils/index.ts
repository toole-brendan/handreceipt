interface ReportStatistics {
  totalItems: number;
  totalValue: number;
  serviceableItems: number;
  unserviceableItems: number;
  missingItems: number;
}

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value);
};

export const calculateReportStatistics = (items: any[]): ReportStatistics => {
  return {
    totalItems: items.length,
    totalValue: items.reduce((sum, item) => sum + (item.value || 0), 0),
    serviceableItems: items.filter(item => item.condition === 'SERVICEABLE').length,
    unserviceableItems: items.filter(item => item.condition === 'UNSERVICEABLE').length,
    missingItems: items.filter(item => item.status === 'MISSING').length
  };
};

export const formatReportDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const getReportClassification = (classification: string): string => {
  const classMap = {
    UNCLASSIFIED: 'classification-unclassified',
    CONFIDENTIAL: 'classification-confidential',
    SECRET: 'classification-secret',
    'TOP SECRET': 'classification-top-secret'
  };
  return classMap[classification as keyof typeof classMap] || 'classification-unknown';
};

export interface ReportTemplate {
  id: string;
  name: string;
  type: string;
  dateRange: {
    start: string;
    end: string;
  };
  filters: {
    status?: string[];
    classification?: string[];
  };
  format: 'pdf' | 'csv' | 'excel';
}

export const validateTemplate = (template: Partial<ReportTemplate>): boolean => {
  const requiredFields = ['name', 'type', 'dateRange', 'format'];
  return requiredFields.every(field => !!template[field as keyof ReportTemplate]);
};

export const getTemplateDisplayName = (template: ReportTemplate): string => {
  const date = new Date(template.dateRange.start);
  return `${template.name} (${date.toLocaleDateString()})`;
};

export const filterReportData = (
  data: any[],
  filters: ReportTemplate['filters']
): any[] => {
  return data.filter(item => {
    if (filters.status?.length && !filters.status.includes(item.status)) {
      return false;
    }
    if (filters.classification?.length && !filters.classification.includes(item.classification)) {
      return false;
    }
    return true;
  });
};

export const getExportFileName = (template: ReportTemplate): string => {
  const timestamp = new Date().toISOString().split('T')[0];
  return `${template.name.toLowerCase().replace(/\s+/g, '-')}-${timestamp}.${template.format}`;
}; 