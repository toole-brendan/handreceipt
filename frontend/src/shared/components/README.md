# Hand Receipt UI Component Library

A modern, accessible, and type-safe UI component library for the Hand Receipt Management System.

## Component Categories

### Inputs
Components for user input and form handling:
- `Button` - Primary action buttons with variants
- `Checkbox` - Form checkboxes with labels
- `Form` - Form handling with validation
- `Input` - Text input fields
- `Label` - Form labels with accessibility
- `Select` - Dropdown selection menus

### Feedback
Components for user feedback and notifications:
- `Alert` - System alerts and notifications
- `Badge` - Status indicators and counts
- `Skeleton` - Loading state placeholders
- `Toast` - Temporary notifications
- `Tooltip` - Contextual information

### Layout
Components for page and content structure:
- `Card` - Content containers with variants:
  - `CardContent` - Main content area
  - `CardDescription` - Secondary text
  - `CardFooter` - Action area
  - `CardHeader` - Title area
  - `CardTitle` - Primary text
- `Sheet` - Modal and dialog containers
- `Table` - Data table layouts

### Navigation
Components for user navigation:
- `Breadcrumb` - Page navigation trails
- `Command` - Command palette interface

## Usage Guidelines

### Installation
All components are available through the main UI export:
```typescript
import { Button, Input, Card } from '@/ui';
```

### Styling
Components use a consistent styling approach:
- Tailwind CSS for base styles
- CSS variables for theming
- CSS modules for component-specific styles

### Accessibility
All components follow WCAG 2.1 guidelines:
- ARIA labels and roles
- Keyboard navigation
- Screen reader support
- Focus management

### Type Safety
Components are built with TypeScript:
- Strict prop typing
- Event handler types
- Style prop types
- Ref forwarding

## Component Documentation

Each component follows a consistent documentation structure:

### Props Interface
```typescript
interface ComponentProps {
  // Required props
  label: string;
  // Optional props with defaults
  variant?: 'primary' | 'secondary';
  // Event handlers
  onChange?: (value: string) => void;
}
```

### Examples
```tsx
// Basic usage
<Button>Click Me</Button>

// With variants
<Button variant="secondary">Cancel</Button>

// With event handlers
<Button onClick={() => console.log('Clicked!')}>
  Submit
</Button>
```

### Best Practices
- When to use
- When not to use
- Accessibility considerations
- Performance considerations

## Development

### Adding New Components
1. Create component directory in appropriate category
2. Add component implementation
3. Add TypeScript types
4. Add documentation
5. Add to index exports
6. Create Storybook story

### Testing
- Unit tests with Jest
- Integration tests with Testing Library
- Visual regression tests with Storybook
- Accessibility tests with axe-core

### Contributing
- Follow TypeScript strict mode
- Follow accessibility guidelines
- Add proper documentation
- Add tests
- Update examples 