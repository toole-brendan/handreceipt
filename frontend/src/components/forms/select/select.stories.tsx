import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './select';

const meta = {
  title: 'UI/Inputs/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof Select>;

const defaultOptions = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
];

// Base Select
export const Default: Story = {
  args: {
    options: defaultOptions,
  },
};

// With Label
export const WithLabel: Story = {
  args: {
    label: 'Select an option',
    options: defaultOptions,
  },
};

// With Placeholder
export const WithPlaceholder: Story = {
  args: {
    label: 'Select an option',
    placeholder: 'Choose an option...',
    options: defaultOptions,
  },
};

// With Hint
export const WithHint: Story = {
  args: {
    label: 'Select an option',
    hint: 'Choose your preferred option',
    options: defaultOptions,
  },
};

// With Error
export const WithError: Story = {
  args: {
    label: 'Select an option',
    error: 'Please select an option',
    options: defaultOptions,
  },
};

// Sizes
export const Small: Story = {
  args: {
    label: 'Small select',
    size: 'sm',
    options: defaultOptions,
  },
};

export const Medium: Story = {
  args: {
    label: 'Medium select',
    size: 'md',
    options: defaultOptions,
  },
};

export const Large: Story = {
  args: {
    label: 'Large select',
    size: 'lg',
    options: defaultOptions,
  },
};

// Disabled
export const Disabled: Story = {
  args: {
    label: 'Disabled select',
    disabled: true,
    options: defaultOptions,
  },
};

// With Disabled Options
export const WithDisabledOptions: Story = {
  args: {
    label: 'Select with disabled options',
    options: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2', disabled: true },
      { value: '3', label: 'Option 3' },
    ],
  },
};

// Required
export const Required: Story = {
  args: {
    label: 'Required select',
    required: true,
    options: defaultOptions,
  },
};

// With Groups
export const WithGroups: Story = {
  render: () => (
    <Select label="Select with groups">
      <optgroup label="Group 1">
        <option value="1.1">Option 1.1</option>
        <option value="1.2">Option 1.2</option>
      </optgroup>
      <optgroup label="Group 2">
        <option value="2.1">Option 2.1</option>
        <option value="2.2">Option 2.2</option>
      </optgroup>
    </Select>
  ),
}; 