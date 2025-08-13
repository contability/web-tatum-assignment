import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ConfirmButton from './index';

describe('ConfirmButton', () => {
  it('기본 텍스트를 올바르게 렌더링한다', () => {
    render(<ConfirmButton>Confirm</ConfirmButton>);
    expect(screen.getByText('Confirm')).toBeInTheDocument();
  });

  it('유효한 상태일 때 버튼이 활성화된다', () => {
    render(<ConfirmButton isValid={true}>Valid</ConfirmButton>);

    const button = screen.getByRole('button');
    expect(button).not.toBeDisabled();
    expect(button).toHaveClass('btn-base', 'btn-confirm-blue', 'btn-md');
  });

  it('유효하지 않은 상태일 때 버튼이 비활성화된다', () => {
    render(<ConfirmButton isValid={false}>Invalid</ConfirmButton>);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('btn-base', 'btn-disabled', 'btn-md');
    expect(button).toHaveAttribute('aria-disabled', 'true');
  });

  it('활성화 상태에서 onClick 이벤트가 올바르게 동작한다', () => {
    const handleClick = jest.fn();
    render(
      <ConfirmButton isValid={true} onClick={handleClick}>
        Click Me
      </ConfirmButton>,
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
