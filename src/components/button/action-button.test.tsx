import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ActionButton from './action-button';

describe('ActionButton', () => {
  it('기본 텍스트를 올바르게 렌더링한다', () => {
    render(<ActionButton>Test Button</ActionButton>);
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  it('기본 theme는 blue이다', () => {
    render(<ActionButton>Default</ActionButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-blue-600', 'hover:bg-blue-700', 'focus:ring-blue-500');
  });

  it('theme이 올바르게 적용된다', () => {
    render(<ActionButton theme="green">Green Button</ActionButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-green-600', 'hover:bg-green-700', 'focus:ring-green-500');
  });

  it('추가 className이 올바르게 적용된다', () => {
    render(<ActionButton className="custom-class">Custom</ActionButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('onClick 이벤트가 올바르게 동작한다', () => {
    const handleClick = jest.fn();
    render(<ActionButton onClick={handleClick}>Click Me</ActionButton>);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('disabled 상태에서 onClick이 호출되지 않는다', () => {
    const handleClick = jest.fn();
    render(
      <ActionButton disabled onClick={handleClick}>
        Disabled
      </ActionButton>,
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });

  it('추가 HTML 속성들이 올바르게 전달된다', () => {
    render(
      <ActionButton id="test-button" data-testid="action-btn" aria-label="테스트 버튼">
        Test
      </ActionButton>,
    );

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('id', 'test-button');
    expect(button).toHaveAttribute('data-testid', 'action-btn');
    expect(button).toHaveAttribute('aria-label', '테스트 버튼');
  });
});
