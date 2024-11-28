/* frontend/src/ui/components/common/Sidebar.tsx */

import React from 'react';
import { NavLink } from 'react-router-dom';
import '@styles/components/sidebar.css';

const Sidebar: React.FC = () => {
  return (
    <nav 
      className="sidebar"
      role="navigation"
      aria-label="Main Navigation"
    >
      {/* Main Navigation */}
      <div className="sidebar-section" role="group">
        <NavLink 
          to="/"
          className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
        >
          <i className="sidebar-item-icon material-icons" aria-hidden="true">dashboard</i>
          <span className="sidebar-item-text">Dashboard</span>
        </NavLink>
        <NavLink 
          to="/property/my-property"
          className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
        >
          <i className="sidebar-item-icon material-icons" aria-hidden="true">inventory_2</i>
          <span className="sidebar-item-text">My Property</span>
        </NavLink>
        <NavLink 
          to="/property/personnel-property"
          className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
        >
          <i className="sidebar-item-icon material-icons" aria-hidden="true">group</i>
          <span className="sidebar-item-text">Personnel Property</span>
        </NavLink>
        <NavLink 
          to="/assets/create-qr"
          className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
        >
          <i className="sidebar-item-icon material-icons" aria-hidden="true">qr_code_2</i>
          <span className="sidebar-item-text">Create QR Code</span>
        </NavLink>
      </div>

      {/* Blockchain Section */}
      <div className="sidebar-section" role="group" aria-label="Blockchain">
        <div className="sidebar-section-title" id="blockchain-section">Blockchain</div>
        <div role="menu" aria-labelledby="blockchain-section">
          <NavLink 
            to="/blockchain/explorer"
            className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
          >
            <i className="sidebar-item-icon material-icons" aria-hidden="true">explore</i>
            <span className="sidebar-item-text">Explorer</span>
          </NavLink>
          <NavLink 
            to="/blockchain/transactions"
            className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
          >
            <i className="sidebar-item-icon material-icons" aria-hidden="true">swap_horiz</i>
            <span className="sidebar-item-text">Transactions</span>
          </NavLink>
        </div>
      </div>

      {/* Reports Section */}
      <div className="sidebar-section" role="group" aria-label="Reports">
        <div className="sidebar-section-title" id="reports-section">Reports</div>
        <div role="menu" aria-labelledby="reports-section">
          <NavLink 
            to="/reports"
            className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
          >
            <i className="sidebar-item-icon material-icons" aria-hidden="true">assessment</i>
            <span className="sidebar-item-text">Reports</span>
          </NavLink>
        </div>
      </div>

      {/* Classification Level */}
      <div 
        className="classification-level"
        role="status"
        aria-live="polite"
      >
        <i className="material-icons" aria-hidden="true">verified_user</i>
        <span>Classification Level: SECRET</span>
      </div>
    </nav>
  );
};

export default Sidebar;