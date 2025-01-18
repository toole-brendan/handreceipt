# Service Layer Documentation

## Overview

The service layer in our application is responsible for handling all communication with external services and APIs. It provides a clean interface for components to interact with backend services while abstracting away the implementation details of these interactions.

## Structure

The service layer is organized into two main parts:

1. **Core API Client** (`src/services/api.ts`)
   - Provides the base `ApiClient` class with common HTTP methods
   - Handles authentication, error handling, and request/response formatting
   - Implements health check functionality

2. **Feature-Specific Services** (`src/features/*/services/`)
   - Each feature module has its own services directory
   - Contains API endpoints and business logic specific to that feature
   - Uses the core API client for making HTTP requests

## Core API Client

The core API client (`ApiClient`) provides the following functionality:

- HTTP methods (GET, POST, PUT, PATCH, DELETE)
- Automatic token handling for authentication
- Error handling and logging
- Health check endpoint
- Type-safe responses using TypeScript generics

Example usage:
```typescript
import { api } from '@/services/api';

// Making a GET request
const data = await api.get<ResponseType>('/endpoint');

// Making a POST request with data
const result = await api.post<ResponseType>('/endpoint', { key: 'value' });
```

## Feature Services

Each feature module contains its own services that use the core API client. For example:

### Property Service (`src/features/property/services/api.ts`)
- Property CRUD operations
- Property transfer functionality
- Status updates
- History tracking

### Authentication Service (`src/features/auth/services/api.ts`)
- User authentication
- Token management
- Session handling

### Personnel Service (`src/features/personnel/services/api.ts`)
- User management
- Role assignments
- Personnel records

## Best Practices

1. **Type Safety**
   - Always use TypeScript interfaces for request/response types
   - Define types in the feature's `types` directory
   - Use generics with the API client methods

2. **Error Handling**
   - Use try/catch blocks for error handling
   - Log errors appropriately
   - Return meaningful error messages to the UI

3. **Organization**
   - Keep feature-specific services in their respective feature directories
   - Use the core API client for all HTTP requests
   - Document service methods and their parameters

4. **Testing**
   - Write unit tests for service methods
   - Mock API responses in tests
   - Test error handling scenarios

## Example Implementation

```typescript
// src/features/example/services/api.ts
import { api } from '@/services/api';
import { ExampleType } from '../types';

export const getExamples = () => api.get<ExampleType[]>('/examples');
export const createExample = (data: Partial<ExampleType>) => 
  api.post<ExampleType>('/examples', data);
``` 