import { render, screen, fireEvent } from '@testing-library/react';
import Select from './index';

const mockOptions = [
  { value: 'option1', label: '옵션 1' },
  { value: 'option2', label: '옵션 2' },
  { value: 'option3', label: '옵션 3' },
];

describe('Select 컴포넌트', () => {
  test('기본 Select가 올바르게 렌더링되어야 한다', () => {
    render(<Select optionList={mockOptions} value="" />);

    const selectButton = screen.getByText('Please select value.');
    expect(selectButton).toBeInTheDocument();
  });

  test('선택된 값이 올바르게 표시되어야 한다', () => {
    render(<Select optionList={mockOptions} value="option2" />);

    const selectedOption = screen.getByText('옵션 2');
    expect(selectedOption).toBeInTheDocument();
  });

  test('클릭 시 옵션 목록이 표시되어야 한다', () => {
    render(<Select optionList={mockOptions} value="" />);

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

    const selectButton = screen.getByRole('button');
    fireEvent.click(selectButton);

    const optionList = screen.getByRole('listbox');
    expect(optionList).toBeInTheDocument();

    expect(screen.getByText('옵션 1')).toBeInTheDocument();
    expect(screen.getByText('옵션 2')).toBeInTheDocument();
    expect(screen.getByText('옵션 3')).toBeInTheDocument();
  });

  test('옵션 선택 시 값이 변경되어야 한다', () => {
    const mockOnChange = jest.fn();
    const mockRegister = {
      name: 'test-select',
      onChange: mockOnChange,
      onBlur: jest.fn(),
      ref: jest.fn(),
    };

    render(<Select optionList={mockOptions} value="" register={mockRegister} />);

    const selectButton = screen.getByRole('button');
    fireEvent.click(selectButton);

    const option = screen.getByText('옵션 3');
    fireEvent.click(option);

    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  test('className prop이 올바르게 적용되어야 한다', () => {
    render(<Select optionList={mockOptions} value="" className="test-class" />);

    const selectButton = screen.getByRole('button');
    expect(selectButton).toHaveClass('test-class');
  });
});
