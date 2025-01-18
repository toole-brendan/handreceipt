# Button Component

A versatile button component that supports various styles, sizes, and states.

## Usage

```tsx
import { Button } from '@/ui';

// Basic usage
<Button>Click Me</Button>

// With variants
<Button variant="primary">Submit</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="destructive">Delete</Button>

// With sizes
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>

// With icon
<Button>
  <Icon className="mr-2" />
  With Icon
</Button>

// Disabled state
<Button disabled>Disabled</Button>

// Loading state
<Button disabled>
  <Spinner className="mr-2" />
  Loading
</Button>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'primary' \| 'secondary' \| 'destructive' \| 'outline' \| 'ghost' \| 'link'` | `'default'` | The visual style of the button |
| `size` | `'default' \| 'sm' \| 'lg' \| 'icon'` | `'default'` | The size of the button |
| `disabled` | `boolean` | `false` | Whether the button is disabled |
| `className` | `string` | `''` | Additional CSS classes |
| `children` | `ReactNode` | - | The content of the button |
| `onClick` | `(event: MouseEvent) => void` | - | Click handler |

## Styling

The button uses Tailwind CSS for styling with support for:
- Color variants through the `variant` prop
- Size variations through the `size` prop
- Disabled states
- Focus and hover states
- Loading states
- Icon support

## Accessibility

The button component:
- Uses the native `<button>` element
- Supports keyboard navigation
- Maintains proper focus states
- Includes ARIA attributes when needed
- Disables interaction when `disabled` is true

## Best Practices

### Do
- Use clear, action-oriented text
- Use appropriate variants for different actions
- Include loading states for async actions
- Add icons to enhance visual meaning
- Use consistent sizing within contexts

### Don't
- Use for navigation (use `Link` instead)
- Nest buttons within buttons
- Use disabled state for temporary conditions
- Mix different sizes in the same group
- Overuse destructive variants

## Examples

### Form Submit Button
```tsx
<Button variant="primary" type="submit">
  Save Changes
</Button>
```

### Delete Button
```tsx
<Button variant="destructive" onClick={handleDelete}>
  Delete Item
</Button>
```

### Loading Button
```tsx
<Button disabled={isLoading}>
  {isLoading ? (
    <>
      <Spinner className="mr-2" />
      Saving...
    </>
  ) : (
    'Save'
  )}
</Button>
```

### Button with Icon
```tsx
<Button>
  <PlusIcon className="mr-2" />
  Add Item
</Button>
```

## Related Components
- `IconButton` - For icon-only buttons
- `LinkButton` - For button-styled links
- `ButtonGroup` - For grouped buttons 