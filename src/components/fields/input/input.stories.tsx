import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Input from '.';

const meta = {
  title: 'Components/Fields/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'tel'],
    },
    disabled: { control: 'boolean' },
  },
} as Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: {
    type: 'text',
    placeholder: '텍스트를 입력하세요',
    className: 'w-80',
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: '비밀번호를 입력하세요',
    className: 'w-80',
  },
};

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: '이메일을 입력하세요',
    className: 'w-80',
  },
};

export const Disabled: Story = {
  args: {
    type: 'text',
    placeholder: '비활성화된 입력란',
    disabled: true,
    className: 'w-80',
  },
};
