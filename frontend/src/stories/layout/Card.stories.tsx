import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/layout';
import { Button } from '@/shared/components/inputs';
import { Settings, ChevronRight } from 'lucide-react';

const meta = {
  title: 'UI/Layout/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Simple Card</CardTitle>
        <CardDescription>A basic card example</CardDescription>
      </CardHeader>
      <CardContent>
        This is some sample content for the card. It can contain any React components or plain text.
      </CardContent>
    </Card>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card with Footer</CardTitle>
        <CardDescription>A card with actions in the footer</CardDescription>
      </CardHeader>
      <CardContent>
        This card has a footer with action buttons.
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Save</Button>
      </CardFooter>
    </Card>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Settings className="w-4 h-4" />
          <CardTitle>Settings Card</CardTitle>
        </div>
        <CardDescription>Manage your preferences</CardDescription>
      </CardHeader>
      <CardContent>
        Configure your application settings here.
      </CardContent>
    </Card>
  ),
}; 