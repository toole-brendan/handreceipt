import React from 'react';
import { Header, Sidebar } from '@/components/layout';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="app-layout">
      <Header />
      <div className="main-content">
        <Sidebar />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
