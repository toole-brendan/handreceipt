import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './input';

const meta = {
  title: 'UI/Inputs/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof Input>;

// Base Input
export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

// With Label
export const WithLabel: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    type: 'email',
  },
};

// With Hint
export const WithHint: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
    hint: 'Must be at least 8 characters',
  },
};

// With Error
export const WithError: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
    error: 'This username is already taken',
  },
};

// Disabled
export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'Cannot edit this field',
    disabled: true,
  },
};

// Required
export const Required: Story = {
  args: {
    label: 'Required Field',
    placeholder: 'This field is required',
    required: true,
  },
};

// File Input
export const FileInput: Story = {
  args: {
    label: 'Upload File',
    type: 'file',
    accept: 'image/*',
  },
};

// Number Input
export const NumberInput: Story = {
  args: {
    label: 'Quantity',
    type: 'number',
    min: 0,
    max: 100,
    defaultValue: 1,
  },
};

// Date Input
export const DateInput: Story = {
  args: {
    label: 'Select Date',
    type: 'date',
  },
}; 