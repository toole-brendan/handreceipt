import React from 'react';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { FileText, Shield, Wrench, Package2 } from 'lucide-react';
import { REPORT_TEMPLATES } from '@/constants/reports';

type TemplateType = typeof REPORT_TEMPLATES[keyof typeof REPORT_TEMPLATES];

const TEMPLATE_ICONS: Record<TemplateType, React.ReactNode> = {
  'property_accountability': <Package2 size={20} />,
  'maintenance': <Wrench size={20} />,
  'audit': <FileText size={20} />,
  'security': <Shield size={20} />,
};

const TEMPLATE_NAMES: Record<TemplateType, string> = {
  'property_accountability': 'Property Accountability',
  'maintenance': 'Maintenance',
  'audit': 'Audit',
  'security': 'Security',
};

interface ReportTemplatesProps {
  onSelect?: (templateType: TemplateType) => void;
}

export const ReportTemplates: React.FC<ReportTemplatesProps> = ({ onSelect }) => {
  const handleTemplateSelect = (templateType: TemplateType) => {
    if (onSelect) {
      onSelect(templateType);
    }
  };

  return (
    <List sx={{ 
      mx: -3,
      '& .MuiListItemButton-root': {
        py: 1.5,
        '&:hover': {
          bgcolor: 'rgba(255, 255, 255, 0.05)',
        },
      },
      '& .MuiListItemIcon-root': {
        color: 'text.secondary',
        minWidth: 40,
      },
      '& .MuiDivider-root': {
        borderColor: 'rgba(255, 255, 255, 0.1)',
      },
    }}>
      {(Object.values(REPORT_TEMPLATES) as TemplateType[]).map((templateType, index, array) => (
        <React.Fragment key={templateType}>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleTemplateSelect(templateType)}>
              <ListItemIcon>
                {TEMPLATE_ICONS[templateType]}
              </ListItemIcon>
              <ListItemText 
                primary={TEMPLATE_NAMES[templateType]}
                primaryTypographyProps={{
                  variant: 'body2',
                  fontWeight: 500,
                }}
              />
            </ListItemButton>
          </ListItem>
          {index < array.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </List>
  );
}; 