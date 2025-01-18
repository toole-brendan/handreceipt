HandReceipt Frontend Architecture
Overview
HandReceipt is a military property management system that replaces traditional paper-based hand receipts with a secure, efficient digital solution. The frontend is built with React, TypeScript, and Material-UI, following a features-first architecture.
Core Principles
Features-First Architecture
The application is organized primarily around features rather than technical types. Each feature is self-contained with its own components, hooks, services, and types.

src/
├── features/           # Core feature modules
├── pages/             # Minimal page components
├── components/        # Shared components
├── styles/           # Global styles and themes
└── shared/           # Shared utilities and types

Role-Based Access
The application supports three user roles with different access levels:

Soldier

My Property
Transfer Requests
Sensitive Items
Maintenance
History
Settings
Logout


NCO (All Soldier access plus)

Personnel


Officer (All NCO access plus)

QR Generator
Reports



Directory Structure
Features Directory (src/features/)
Each feature is a self-contained module:

src/features/
├── property/          # Core property management
├── personnel/         # Personnel management (NCO/Officer)
├── maintenance/       # Maintenance requests
├── transfers/        # Transfer management
├── sensitive-items/  # Sensitive items tracking
├── reports/         # Reporting (Officer only)
└── qr-generator/    # QR code generation (Officer only)


Each feature follows this structure:

feature/
├── components/       # Feature-specific components
├── hooks/           # Custom hooks
├── services/        # API services
├── types/           # TypeScript types
└── utils/           # Utility functions

Pages Directory (src/pages/)
Pages are minimal components that import from features:

src/pages/
├── admin/           # Admin-specific pages
├── auth/            # Authentication pages
├── property/        # Property-related pages
├── maintenance/     # Maintenance pages
├── transfers/       # Transfer pages
├── personnel/       # Personnel pages (NCO/Officer)
├── reports/         # Report pages (Officer)
├── qr/             # QR generation (Officer)
├── settings/       # User settings
└── utility/        # General utility pages


Shared Components (src/components/)
Reusable components used across features:

src/components/
├── layout/          # Layout components
├── common/          # Common UI components
├── forms/           # Form components
└── feedback/        # Feedback components

Development Guidelines
Creating New Features

Create feature directory in src/features/
Implement components, hooks, and services
Create minimal page component
Add routes in src/app/routes.tsx

Page Implementation
Pages should be minimal:

const FeaturePage = () => {
  return <FeatureComponent />;
};

Component Guidelines

Use Material-UI components
Follow established aesthetic
Implement role-based access
Keep business logic in features

Role-Based Implementation
Authentication

Role determined at login
Stored in auth context
Used for route protection

Navigation

Sidebar adapts to user role
Common layout wrapper
Protected routes

Testing

Unit Tests

Component testing
Hook testing
Service testing


Integration Tests

Feature workflows
Role-based access
Navigation


Contributing

Follow features-first architecture
Maintain role-based access
Use existing components
Follow aesthetic guidelines