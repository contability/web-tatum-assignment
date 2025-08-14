import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Input from '../input';
import FormField from '.';

const meta = {
  title: 'Components/Fields/FormField',
  component: FormField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} as Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithLabel: Story = {
  render: args => (
    <FormField {...args}>
      <Input id="name" placeholder="이름을 입력하세요" className="w-80" />
    </FormField>
  ),
  args: {
    label: {
      id: 'name',
      content: '이름',
    },
  },
};

export const WithError: Story = {
  render: args => (
    <FormField {...args}>
      <Input id="email" placeholder="이메일을 입력하세요" className="w-80" />
    </FormField>
  ),
  args: {
    label: {
      id: 'email',
      content: '이메일',
    },
    error: {
      type: 'required',
      message: '이메일을 입력해주세요.',
    },
  },
};

export const LineBreak: Story = {
  render: args => (
    <FormField {...args}>
      <Input id="address" placeholder="주소를 입력하세요" className="w-80" />
    </FormField>
  ),
  args: {
    label: {
      id: 'address',
      content: '주소',
    },
    isLineBreak: true,
  },
};

export const WithCustomLabelClass: Story = {
  render: args => (
    <FormField {...args}>
      <Input id="phone" placeholder="전화번호를 입력하세요" className="w-80" />
    </FormField>
  ),
  args: {
    label: {
      id: 'phone',
      content: '전화번호',
    },
    labelClassName: 'text-forest font-bold whitespace-pre mr-3',
  },
};
