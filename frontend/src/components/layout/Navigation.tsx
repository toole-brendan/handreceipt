/* frontend/src/shared/components/layout/Navigation.tsx */

import React from 'react';
import Sidebar from './Sidebar';
import { BreadcrumbProvider } from '../navigation/breadcrumb/BreadcrumbContext';

const Navigation: React.FC = () => {
  return (
    <BreadcrumbProvider>
      <Sidebar variant="permanent" />
    </BreadcrumbProvider>
  );
};

export default Navigation;
