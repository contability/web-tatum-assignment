import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import CircleSpinner from './index';

const meta = {
  title: 'Components/Spinner/CircleSpinner',
  component: CircleSpinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} as Meta<typeof CircleSpinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const CustomSize: Story = {
  args: {
    className: 'size-15 lg:size-20',
  },
};

export const CustomColor: Story = {
  args: {
    className: 'fill-error-red',
  },
};
