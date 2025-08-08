import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ActionButton from './action-button';

const meta: Meta<typeof ActionButton> = {
  title: 'Components/Button/ActionButton',
  component: ActionButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '다양한 액션을 수행하는 버튼 컴포넌트이다. 5가지 테마 색상을 지원한다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: { type: 'select' },
      options: ['blue', 'gray', 'green', 'yellow', 'red'],
      description: '버튼의 색상 테마를 설정',
    },
    children: {
      control: { type: 'text' },
      description: '버튼 내부에 표시될 내용',
    },
    disabled: {
      control: { type: 'boolean' },
      description: '버튼 비활성화 상태',
    },
    onClick: {
      action: 'clicked',
      description: '클릭 이벤트 핸들러',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default Button',
    theme: 'blue',
  },
};

export const Themes: Story = {
  name: 'All Themes',
  render: () => (
    <div className="flex flex-wrap gap-3">
      <ActionButton theme="blue">Blue</ActionButton>
      <ActionButton theme="gray">Gray</ActionButton>
      <ActionButton theme="green">Green</ActionButton>
      <ActionButton theme="yellow">Yellow</ActionButton>
      <ActionButton theme="red">Red</ActionButton>
    </div>
  ),
};

export const States: Story = {
  name: 'Button States',
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="mb-2 text-sm font-medium text-gray-700">Normal State</h3>
        <div className="flex gap-2">
          <ActionButton theme="blue">Normal</ActionButton>
          <ActionButton theme="green">Success</ActionButton>
          <ActionButton theme="red">Danger</ActionButton>
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-medium text-gray-700">Disabled State</h3>
        <div className="flex gap-2">
          <ActionButton theme="blue" disabled>
            Disabled Blue
          </ActionButton>
          <ActionButton theme="green" disabled>
            Disabled Green
          </ActionButton>
          <ActionButton theme="red" disabled>
            Disabled Red
          </ActionButton>
        </div>
      </div>
    </div>
  ),
};

export const UseCases: Story = {
  name: 'Common Use Cases',
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="mb-2 text-sm font-medium text-gray-700">Actions</h3>
        <div className="flex gap-2">
          <ActionButton theme="blue">Save</ActionButton>
          <ActionButton theme="green">Confirm</ActionButton>
          <ActionButton theme="yellow">Edit</ActionButton>
          <ActionButton theme="red">Delete</ActionButton>
          <ActionButton theme="gray">Cancel</ActionButton>
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-medium text-gray-700">Cloud Management</h3>
        <div className="flex gap-2">
          <ActionButton theme="green">Start Instance</ActionButton>
          <ActionButton theme="yellow">Restart</ActionButton>
          <ActionButton theme="red">Stop Instance</ActionButton>
          <ActionButton theme="blue">View Details</ActionButton>
        </div>
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  args: {
    children: 'Click Me',
    theme: 'blue',
    onClick: () => alert('Button clicked!'),
  },
};
