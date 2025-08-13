import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ConfirmButton from './index';

const meta: Meta<typeof ConfirmButton> = {
  title: 'Components/Button/ConfirmButton',
  component: ConfirmButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '폼 에러 여부에 따라 활성화/비활성화되는 확인 버튼 컴포넌트다. errors 객체에 에러가 있으면 자동으로 비활성화된다.',
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
      description: '버튼 명시적 비활성화 상태',
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
    children: 'Confirm',
    theme: 'blue',
    size: 'md',
    isValid: true,
  },
};

export const NoErrors: Story = {
  name: '활성화 상태 (에러 없음)',
  args: {
    children: 'Submit Form',
    theme: 'blue',
    isValid: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'errors 객체가 비어있거나 undefined일 때 버튼이 활성화된다.',
      },
    },
  },
};

export const WithErrors: Story = {
  name: '비활성화 상태 (에러 있음)',
  args: {
    children: 'Submit Form',
    theme: 'blue',
    isValid: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'errors 객체에 에러가 있을 때 버튼이 자동으로 비활성화된다.',
      },
    },
  },
};

export const AllThemesEnabled: Story = {
  name: '모든 테마 (활성화)',
  render: () => (
    <div className="flex flex-wrap gap-4">
      <ConfirmButton theme="blue" isValid={true}>
        Blue
      </ConfirmButton>
      <ConfirmButton theme="gray" isValid={true}>
        Gray
      </ConfirmButton>
      <ConfirmButton theme="green" isValid={true}>
        Green
      </ConfirmButton>
      <ConfirmButton theme="yellow" isValid={true}>
        Yellow
      </ConfirmButton>
      <ConfirmButton theme="red" isValid={true}>
        Red
      </ConfirmButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '모든 테마 색상의 활성화 상태를 보여준다.',
      },
    },
  },
};

export const AllThemesDisabled: Story = {
  name: '모든 테마 (비활성화)',
  render: () => (
    <div className="flex flex-wrap gap-4">
      <ConfirmButton theme="blue" isValid={false}>
        Blue
      </ConfirmButton>
      <ConfirmButton theme="gray" isValid={false}>
        Gray
      </ConfirmButton>
      <ConfirmButton theme="green" isValid={false}>
        Green
      </ConfirmButton>
      <ConfirmButton theme="yellow" isValid={false}>
        Yellow
      </ConfirmButton>
      <ConfirmButton theme="red" isValid={false}>
        Red
      </ConfirmButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '모든 테마 색상의 비활성화 상태를 보여준다. 에러가 있을 때는 테마에 관계없이 동일한 비활성화 스타일이 적용된다.',
      },
    },
  },
};

export const AllSizes: Story = {
  name: '모든 크기',
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <ConfirmButton theme="blue" size="sm" isValid={true}>
        Small
      </ConfirmButton>
      <ConfirmButton theme="blue" size="md" isValid={true}>
        Medium
      </ConfirmButton>
      <ConfirmButton theme="blue" size="lg" isValid={true}>
        Large
      </ConfirmButton>
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

export const ExplicitlyDisabled: Story = {
  name: '명시적 비활성화',
  args: {
    children: 'Disabled Button',
    theme: 'blue',
    isValid: true,
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'disabled prop을 true로 설정하면 에러가 없어도 버튼이 비활성화된다.',
      },
    },
  },
};
