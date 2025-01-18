import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/shared/components/inputs';
import { ChevronRight, Plus, Trash2, Download, Settings, Search } from 'lucide-react';

const meta = {
  title: 'UI/Inputs/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default Button',
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const WithIcon: Story = {
  args: {
    children: 'With Icon',
    icon: <ChevronRight className="w-4 h-4" />,
  },
};

export const Loading: Story = {
  args: {
    children: 'Loading',
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
  },
}; 