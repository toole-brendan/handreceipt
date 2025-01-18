import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Form, FormField, FormSection, FormActions } from './form';
import { Input } from '../input';
import { Select } from '../select';
import { Button } from '../button';

const meta = {
  title: 'UI/Inputs/Form',
  component: Form,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof Form>;

// Basic Form
export const Default: Story = {
  render: () => (
    <Form onSubmit={console.log} style={{ width: '400px' }}>
      <FormField name="email" label="Email" required>
        <Input type="email" placeholder="Enter your email" />
      </FormField>
      <FormField name="password" label="Password" required hint="Must be at least 8 characters">
        <Input type="password" placeholder="Enter your password" />
      </FormField>
      <FormActions>
        <Button type="submit">Submit</Button>
      </FormActions>
    </Form>
  ),
};

// Form with Sections
export const WithSections: Story = {
  render: () => (
    <Form onSubmit={console.log} style={{ width: '400px' }}>
      <FormSection title="Personal Information" description="Enter your personal details">
        <FormField name="firstName" label="First Name" required>
          <Input placeholder="Enter your first name" />
        </FormField>
        <FormField name="lastName" label="Last Name" required>
          <Input placeholder="Enter your last name" />
        </FormField>
      </FormSection>
      
      <FormSection title="Contact Information" description="How can we reach you?">
        <FormField name="email" label="Email" required>
          <Input type="email" placeholder="Enter your email" />
        </FormField>
        <FormField name="phone" label="Phone" optional>
          <Input type="tel" placeholder="Enter your phone number" />
        </FormField>
      </FormSection>

      <FormActions>
        <Button variant="ghost">Cancel</Button>
        <Button type="submit" variant="primary">Save Changes</Button>
      </FormActions>
    </Form>
  ),
};

// Form with Loading State
export const Loading: Story = {
  render: () => (
    <Form onSubmit={console.log} loading style={{ width: '400px' }}>
      <FormField name="email" label="Email" required>
        <Input type="email" placeholder="Enter your email" />
      </FormField>
      <FormField name="password" label="Password" required>
        <Input type="password" placeholder="Enter your password" />
      </FormField>
      <FormActions>
        <Button type="submit" isLoading>Submitting...</Button>
      </FormActions>
    </Form>
  ),
};

// Form with Error
export const WithError: Story = {
  render: () => (
    <Form 
      onSubmit={console.log} 
      error="There was an error submitting the form. Please try again."
      style={{ width: '400px' }}
    >
      <FormField name="email" label="Email" required error="Invalid email address">
        <Input type="email" placeholder="Enter your email" />
      </FormField>
      <FormField name="password" label="Password" required>
        <Input type="password" placeholder="Enter your password" />
      </FormField>
      <FormActions>
        <Button type="submit">Submit</Button>
      </FormActions>
    </Form>
  ),
};

// Form with Success
export const WithSuccess: Story = {
  render: () => (
    <Form 
      onSubmit={console.log} 
      success="Form submitted successfully!"
      style={{ width: '400px' }}
    >
      <FormField name="email" label="Email" required>
        <Input type="email" placeholder="Enter your email" />
      </FormField>
      <FormField name="password" label="Password" required>
        <Input type="password" placeholder="Enter your password" />
      </FormField>
      <FormActions>
        <Button type="submit">Submit</Button>
      </FormActions>
    </Form>
  ),
};

// Form with Different Field Types
export const DifferentFields: Story = {
  render: () => (
    <Form onSubmit={console.log} style={{ width: '400px' }}>
      <FormField name="name" label="Name" required>
        <Input placeholder="Enter your name" />
      </FormField>
      
      <FormField name="email" label="Email" required>
        <Input type="email" placeholder="Enter your email" />
      </FormField>
      
      <FormField name="country" label="Country" required>
        <Select
          options={[
            { value: 'us', label: 'United States' },
            { value: 'uk', label: 'United Kingdom' },
            { value: 'ca', label: 'Canada' },
          ]}
          placeholder="Select your country"
        />
      </FormField>
      
      <FormField name="message" label="Message" hint="Maximum 500 characters">
        <textarea
          className="input"
          rows={4}
          placeholder="Enter your message"
          style={{ resize: 'vertical' }}
        />
      </FormField>
      
      <FormActions>
        <Button variant="ghost">Cancel</Button>
        <Button type="submit" variant="primary">Send Message</Button>
      </FormActions>
    </Form>
  ),
};

// Form with Collapsible Sections
export const CollapsibleSections: Story = {
  render: () => (
    <Form onSubmit={console.log} style={{ width: '400px' }}>
      <FormSection 
        title="Basic Information" 
        description="Your basic details"
        collapsible
        defaultExpanded
      >
        <FormField name="name" label="Name" required>
          <Input placeholder="Enter your name" />
        </FormField>
        <FormField name="email" label="Email" required>
          <Input type="email" placeholder="Enter your email" />
        </FormField>
      </FormSection>
      
      <FormSection 
        title="Additional Information" 
        description="Optional details"
        collapsible
        defaultExpanded={false}
      >
        <FormField name="bio" label="Bio" optional>
          <textarea
            className="input"
            rows={4}
            placeholder="Tell us about yourself"
            style={{ resize: 'vertical' }}
          />
        </FormField>
      </FormSection>
      
      <FormActions sticky>
        <Button variant="ghost">Cancel</Button>
        <Button type="submit" variant="primary">Save Profile</Button>
      </FormActions>
    </Form>
  ),
}; 