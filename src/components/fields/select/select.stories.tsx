import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Select from '.';

const meta = {
  title: 'Components/Fields/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} as Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const optionList = [
  { value: 'apple', label: '사과' },
  { value: 'banana', label: '바나나' },
  { value: 'orange', label: '오렌지' },
  { value: 'grape', label: '포도' },
  { value: 'watermelon', label: '수박' },
];

export const Default: Story = {
  args: {
    optionList,
    value: '',
    className: 'w-80',
  },
};

export const WithSelectedValue: Story = {
  args: {
    optionList,
    value: 'banana',
    className: 'w-80',
  },
};
