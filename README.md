# HandReceipt

A secure military property management system using QR codes and blockchain verification.

## Core Features

- **Property Management**
  - QR code-based property tracking
  - Role-based access control (Officers, NCOs, Soldiers)
  - Location and condition tracking
  - Audit trail with Merkle tree verification

- **Transfer Workflow**
  - QR code scanning for transfers
  - Commander approval for sensitive items
  - Blockchain verification of transfers
  - Digital signatures with Ed25519

- **Security**
  - Role-based access control
  - Audit trails with Merkle tree verification
  - Encryption for sensitive data
  - Command chain validation

## Project Structure

```
.
├── backend/                 # Rust backend service
│   ├── src/
│   │   ├── api/           # API endpoints and handlers
│   │   ├── domain/        # Core business logic
│   │   ├── error/         # Error handling
│   │   ├── infrastructure/# External implementations
│   │   ├── security/      # Security features
│   │   └── types/         # Shared types
│   └── tests/
│       ├── integration/   # Integration tests
│       └── unit/         # Unit tests
│
├── frontend/              # React web interface
│   └── src/
│       ├── app/          # App initialization
│       ├── components/   # Shared components
│       │   ├── common/   # Common UI components
│       │   ├── feedback/ # Error & loading components
│       │   ├── forms/    # Form components
│       │   └── layout/   # Layout components
│       ├── features/     # Feature modules
│       │   ├── analytics/
│       │   ├── auth/
│       │   ├── history/
│       │   ├── maintenance/
│       │   ├── personnel/
│       │   ├── qr-generator/
│       │   ├── sensitive-items/
│       │   ├── settings/
│       │   └── transfers/
│       ├── hooks/        # Custom React hooks
│       ├── pages/        # Page components
│       ├── services/     # API and other services
│       ├── store/        # Redux store
│       │   ├── middleware/
│       │   ├── selectors/
│       │   └── slices/
│       ├── styles/       # Styling and themes
│       └── types/        # TypeScript types
│
└── mobile/               # React Native mobile app
    ├── ios/             # iOS native code
    │   └── HandReceipt/
    │       └── Camera/  # QR scanner implementation
    ├── rust/            # Rust native modules
    │   └── src/
    │       ├── offline/ # Offline support
    │       ├── scanner/ # QR code scanning
    │       └── security/# Security features
    └── src/
        ├── components/  # React Native components
        ├── features/    # Feature modules
        ├── hooks/       # Custom hooks
        ├── native/      # Native bridge
        ├── navigation/  # Navigation setup
        ├── screens/     # Screen components
        ├── services/    # API and services
        ├── store/       # Redux store
        ├── types/       # TypeScript types
        └── utils/       # Utility functions
```

## Getting Started

### Prerequisites

- Rust 1.70+
- Node.js 18+
- PostgreSQL 14+
- OpenSSL

### Backend Setup

1. Install dependencies:
```bash
cd backend
cargo install sqlx-cli
```

2. Create database:
```bash
createdb handreceipt
```

3. Run migrations:
```bash
sqlx migrate run
```

4. Start server:
```bash
cargo run
```

### Frontend Setup

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Start development server:
```bash
npm run dev
```

### Mobile Setup

1. Install dependencies:
```bash
cd mobile
cargo build
```

2. Run scanner:
```bash
cargo run
```

## Development

### Key Components

1. Property Management
   - Property entity with QR code support
   - Role-based access control
   - Location tracking
   - Condition monitoring

2. Transfer Processing
   - QR code scanning
   - Commander approval workflow
   - Blockchain verification
   - Digital signatures

3. Security
   - JWT authentication
   - Role-based authorization
   - Command hierarchy validation
   - Audit trails

### Architecture

The system follows Domain-Driven Design with a clean architecture:

- Domain Layer: Core business logic and rules
- Application Layer: Use case implementations
- Infrastructure Layer: External service implementations
- API Layer: HTTP interface and middleware
- Security Layer: Cross-cutting security concerns

## Security Features

### Authentication

Uses JWT tokens with:
- User ID
- Name
- Rank
- Unit
- Role

### Authorization

Role-based access control:
- Officers can approve sensitive transfers
- NCOs have oversight of junior enlisted soldiers'property ()
- Soldiers can initiate transfers

### Blockchain Verification

Transfers are verified using:
- Digital signatures (Ed25519)
- Authority consensus
- Command chain validation
- Merkle tree verification

### Audit Trail

All actions are logged with:
- Merkle tree verification
- Digital signatures
- Timestamp
- User information
- Location data

## License

This project is licensed under the MIT License - see LICENSE file for details.
