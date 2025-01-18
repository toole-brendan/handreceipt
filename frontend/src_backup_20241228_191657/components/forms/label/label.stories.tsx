import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './label';
import { Input } from '../input';

const meta = {
  title: 'UI/Inputs/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof Label>;

// Base Label
export const Default: Story = {
  args: {
    children: 'Label Text',
  },
};

// Sizes
export const Small: Story = {
  args: {
    children: 'Small Label',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    children: 'Medium Label',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    children: 'Large Label',
    size: 'lg',
  },
};

// Required Label
export const Required: Story = {
  args: {
    children: 'Required Label',
    required: true,
  },
};

// Optional Label
export const Optional: Story = {
  args: {
    children: 'Optional Label',
    optional: true,
  },
};

// Error State
export const Error: Story = {
  args: {
    children: 'Error Label',
    error: true,
  },
};

// With Input
export const WithInput: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <Label htmlFor="example-input">Email Address</Label>
      <Input id="example-input" type="email" placeholder="Enter your email" />
    </div>
  ),
};

// With Disabled Input
export const WithDisabledInput: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <Label htmlFor="disabled-input">Disabled Field</Label>
      <Input id="disabled-input" disabled placeholder="This field is disabled" />
    </div>
  ),
};

// With Required Input
export const WithRequiredInput: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <Label htmlFor="required-input" required>Required Field</Label>
      <Input id="required-input" required placeholder="This field is required" />
    </div>
  ),
};

// With Error Input
export const WithErrorInput: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <Label htmlFor="error-input" error>Invalid Input</Label>
      <Input 
        id="error-input" 
        error="Please enter a valid value" 
        placeholder="This field has an error" 
      />
    </div>
  ),
}; 