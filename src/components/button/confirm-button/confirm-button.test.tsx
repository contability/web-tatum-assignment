import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ConfirmButton from './index';
import { FieldErrors } from 'react-hook-form';

describe('ConfirmButton', () => {
  it('기본 텍스트를 올바르게 렌더링한다', () => {
    render(<ConfirmButton>Confirm</ConfirmButton>);
    expect(screen.getByText('Confirm')).toBeInTheDocument();
  });

  it('errors가 없을 때 버튼이 활성화된다', () => {
    const noErrors: FieldErrors = {};
    render(<ConfirmButton errors={noErrors}>No Errors</ConfirmButton>);

    const button = screen.getByRole('button');
    expect(button).not.toBeDisabled();
    expect(button).toHaveClass('bg-blue-600');
    expect(button).not.toHaveClass('bg-gray-300');
  });

  it('errors가 있을 때 버튼이 비활성화된다', () => {
    const withErrors: FieldErrors = {
      name: { type: 'required', message: '이름은 필수입니다.' },
    };
    render(<ConfirmButton errors={withErrors}>With Errors</ConfirmButton>);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('bg-gray-300', 'text-gray-500', 'cursor-not-allowed');
    expect(button).toHaveAttribute('aria-disabled', 'true');
  });

  it('활성화 상태에서 onClick 이벤트가 올바르게 동작한다', () => {
    const handleClick = jest.fn();
    const noErrors: FieldErrors = {};
    render(
      <ConfirmButton errors={noErrors} onClick={handleClick}>
        Click Me
      </ConfirmButton>,
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('비활성화 상태에서 onClick이 호출되지 않는다', () => {
    const handleClick = jest.fn();
    const withErrors: FieldErrors = {
      email: { type: 'invalid', message: '이메일 형식이 올바르지 않습니다.' },
    };
    render(
      <ConfirmButton errors={withErrors} onClick={handleClick}>
        Disabled
      </ConfirmButton>,
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });
});
