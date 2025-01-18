import React from 'react';
import { Link } from 'react-router-dom';
import '@/styles/features/reports/report-categories.css';

const ReportCategories: React.FC = () => {
  return (
    <div className="report-categories">
      <Link to="property-accountability" className="category-card">
        <i className="material-icons">assignment</i>
        <h3>Property Accountability Report</h3>
        <p>Comprehensive property and hand receipt tracking</p>
      </Link>
      
      <Link to="security" className="category-card">
        <i className="material-icons">security</i>
        <h3>Security Reports</h3>
        <p>Access logs, breaches, and compliance</p>
      </Link>
      
      <Link to="maintenance" className="category-card">
        <i className="material-icons">build</i>
        <h3>Maintenance Reports</h3>
        <p>Service records and schedules</p>
      </Link>
      
      <Link to="audit" className="category-card">
        <i className="material-icons">history</i>
        <h3>Audit Reports</h3>
        <p>Chain of custody and verifications</p>
      </Link>
      
      <Link to="builder" className="category-card custom">
        <i className="material-icons">add_circle</i>
        <h3>Custom Report</h3>
        <p>Build a custom report</p>
      </Link>
    </div>
  );
};

export default ReportCategories; 