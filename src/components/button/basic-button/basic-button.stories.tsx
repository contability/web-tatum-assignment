import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import BasicButton from './index';

const meta: Meta<typeof BasicButton> = {
  title: 'Components/Button/BasicButton',
  component: BasicButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '다양한 변형, 테마, 크기를 지원하는 기본 버튼 컴포넌트다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'outline', 'ghost'],
      description: '버튼의 변형 스타일',
    },
    theme: {
      control: { type: 'select' },
      options: ['blue', 'gray', 'green', 'yellow', 'red'],
      description: '버튼의 테마 색상',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: '버튼의 크기',
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
    children: 'Button',
    variant: 'outline',
    theme: 'gray',
    size: 'md',
  },
};

export const AllVariants: Story = {
  name: '모든 변형 (Blue 테마)',
  render: () => (
    <div className="flex flex-wrap gap-4">
      <BasicButton variant="default" theme="blue">
        Default
      </BasicButton>
      <BasicButton variant="outline" theme="blue">
        Outline
      </BasicButton>
      <BasicButton variant="ghost" theme="blue">
        Ghost
      </BasicButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Blue 테마로 모든 변형 스타일을 보여준다.',
      },
    },
  },
};

export const AllThemes: Story = {
  name: '모든 테마 (Outline)',
  render: () => (
    <div className="flex flex-wrap gap-4">
      <BasicButton theme="blue" variant="outline">
        Blue
      </BasicButton>
      <BasicButton theme="gray" variant="outline">
        Gray
      </BasicButton>
      <BasicButton theme="green" variant="outline">
        Green
      </BasicButton>
      <BasicButton theme="yellow" variant="outline">
        Yellow
      </BasicButton>
      <BasicButton theme="red" variant="outline">
        Red
      </BasicButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Outline 변형으로 모든 테마 색상을 보여준다.',
      },
    },
  },
};

export const AllSizes: Story = {
  name: '모든 크기',
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <BasicButton size="sm">Small</BasicButton>
      <BasicButton size="md">Medium</BasicButton>
      <BasicButton size="lg">Large</BasicButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '모든 크기 옵션을 보여준다.',
      },
    },
  },
};

export const Disabled: Story = {
  name: '비활성화',
  args: {
    children: 'Disabled Button',
    variant: 'outline',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: '비활성화된 버튼 상태를 보여준다.',
      },
    },
  },
};
