import { render, screen, fireEvent } from '@testing-library/react';
import Input from '.';

describe('Input 컴포넌트', () => {
  test('기본 Input이 올바르게 렌더링되어야 한다', () => {
    render(<Input placeholder="테스트 입력" />);

    const inputElement = screen.getByPlaceholderText('테스트 입력');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('type', 'text');
  });

  test('type prop이 올바르게 적용되어야 한다', () => {
    render(<Input type="password" placeholder="비밀번호 입력" />);

    const inputElement = screen.getByPlaceholderText('비밀번호 입력');
    expect(inputElement).toHaveAttribute('type', 'password');
  });

  test('value prop이 올바르게 적용되어야 한다', () => {
    render(<Input value="테스트 값" readOnly />);

    const inputElement = screen.getByDisplayValue('테스트 값');
    expect(inputElement).toBeInTheDocument();
  });

  test('onChange 이벤트가 올바르게 동작해야 한다', () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} placeholder="변경 테스트" />);

    const inputElement = screen.getByPlaceholderText('변경 테스트');
    fireEvent.change(inputElement, { target: { value: '새로운 값' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('disabled 상태가 올바르게 적용되어야 한다', () => {
    render(<Input disabled placeholder="비활성화 입력" />);

    const inputElement = screen.getByPlaceholderText('비활성화 입력');
    expect(inputElement).toBeDisabled();
  });

  test('className prop이 올바르게 적용되어야 한다', () => {
    render(<Input className="test-class" placeholder="스타일 테스트" />);

    const inputContainer = screen.getByPlaceholderText('스타일 테스트');
    expect(inputContainer).toHaveClass('test-class');
  });

  test('id와 name prop이 올바르게 적용되어야 한다', () => {
    render(<Input id="test-id" name="test-name" placeholder="속성 테스트" />);

    const inputElement = screen.getByPlaceholderText('속성 테스트');
    expect(inputElement).toHaveAttribute('id', 'test-id');
    expect(inputElement).toHaveAttribute('name', 'test-name');
  });
});
