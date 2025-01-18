import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './checkbox';

const meta = {
  title: 'UI/Inputs/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof Checkbox>;

// Base Checkbox
export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
  },
};

// Checked State
export const Checked: Story = {
  args: {
    label: 'Checked checkbox',
    defaultChecked: true,
  },
};

// Indeterminate State
export const Indeterminate: Story = {
  args: {
    label: 'Indeterminate checkbox',
    indeterminate: true,
  },
};

// With Hint
export const WithHint: Story = {
  args: {
    label: 'Subscribe to newsletter',
    hint: 'We will send you weekly updates',
  },
};

// With Error
export const WithError: Story = {
  args: {
    label: 'Required checkbox',
    error: 'This field is required',
  },
};

// Disabled State
export const Disabled: Story = {
  args: {
    label: 'Disabled checkbox',
    disabled: true,
  },
};

// Disabled Checked State
export const DisabledChecked: Story = {
  args: {
    label: 'Disabled checked checkbox',
    disabled: true,
    defaultChecked: true,
  },
};

// Required State
export const Required: Story = {
  args: {
    label: 'Required checkbox',
    required: true,
  },
};

// Group Example
export const Group: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Checkbox label="Option 1" name="group" value="1" />
      <Checkbox label="Option 2" name="group" value="2" />
      <Checkbox label="Option 3" name="group" value="3" />
    </div>
  ),
}; 