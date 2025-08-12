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
  args: {
    label: {
      id: 'name',
      content: '이름',
    },
    children: <Input id="name" placeholder="이름을 입력하세요" className="w-80" />,
  },
};

export const WithError: Story = {
  args: {
    label: {
      id: 'email',
      content: '이메일',
    },
    error: {
      type: 'required',
      message: '이메일을 입력해주세요.',
    },
    children: <Input id="email" placeholder="이메일을 입력하세요" className="w-80" />,
  },
};

export const LineBreak: Story = {
  args: {
    label: {
      id: 'address',
      content: '주소',
    },
    isLineBreak: true,
    children: <Input id="address" placeholder="주소를 입력하세요" className="w-80" />,
  },
};

export const WithCustomLabelClass: Story = {
  args: {
    label: {
      id: 'phone',
      content: '전화번호',
    },
    labelClassName: 'text-forest font-bold whitespace-pre mr-3',
    children: <Input id="phone" placeholder="전화번호를 입력하세요" className="w-80" />,
  },
};
