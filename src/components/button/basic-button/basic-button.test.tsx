import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BasicButton from './index';

describe('BasicButton', () => {
  it('기본 텍스트를 올바르게 렌더링한다', () => {
    render(<BasicButton>Button Text</BasicButton>);
    expect(screen.getByText('Button Text')).toBeInTheDocument();
  });

  it('기본 클래스가 올바르게 적용된다', () => {
    render(<BasicButton>Default</BasicButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('btn-base', 'btn-outline-gray', 'btn-md');
  });

  it('theme과 variant가 올바르게 적용된다', () => {
    render(
      <BasicButton theme="blue" variant="default">
        Blue Theme
      </BasicButton>,
    );
    const button = screen.getByRole('button');
    expect(button).toHaveClass('btn-base', 'btn-default-blue', 'btn-md');
  });

  it('onClick 이벤트가 올바르게 동작한다', () => {
    const handleClick = jest.fn();
    render(<BasicButton onClick={handleClick}>Click Me</BasicButton>);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('disabled 상태에서 onClick이 호출되지 않는다', () => {
    const handleClick = jest.fn();
    render(
      <BasicButton disabled onClick={handleClick}>
        Disabled Button
      </BasicButton>,
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleClick).not.toHaveBeenCalled();
    expect(button).toBeDisabled();
  });
});
