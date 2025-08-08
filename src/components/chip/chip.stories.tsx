import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Chip from './index';

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '상태나 카테고리를 나타내는 작은 라벨 컴포넌트이다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'success', 'warning', 'error', 'info', 'neutral'],
      description: 'Chip의 색상을 설정',
    },
    children: {
      control: { type: 'text' },
      description: 'Chip 내부에 표시될 내용',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default',
    variant: 'neutral',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Chip variant="primary">Primary</Chip>
      <Chip variant="success">Success</Chip>
      <Chip variant="warning">Warning</Chip>
      <Chip variant="error">Error</Chip>
      <Chip variant="info">Info</Chip>
      <Chip variant="neutral">Neutral</Chip>
    </div>
  ),
};

export const CloudStatuses: Story = {
  name: 'Cloud Status Examples',
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="mb-2 text-sm font-medium text-gray-700">Status</h3>
        <div className="flex gap-2">
          <Chip variant="success">READY</Chip>
          <Chip variant="warning">PENDING</Chip>
          <Chip variant="error">ERROR</Chip>
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-medium text-gray-700">Event Process</h3>
        <div className="flex gap-2">
          <Chip variant="success">VALID</Chip>
          <Chip variant="error">INVALID</Chip>
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-medium text-gray-700">Scan Schedule</h3>
        <div className="flex gap-2">
          <Chip variant="success">Set</Chip>
          <Chip variant="neutral">Not Set</Chip>
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-medium text-gray-700">Real Time & User Activity</h3>
        <div className="flex gap-2">
          <Chip variant="success">ON</Chip>
          <Chip variant="neutral">OFF</Chip>
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-medium text-gray-700">Cloud Group</h3>
        <div className="flex flex-wrap gap-1">
          <Chip variant="primary">Production</Chip>
          <Chip variant="primary">Development</Chip>
          <Chip variant="primary">Staging</Chip>
        </div>
      </div>
    </div>
  ),
};
