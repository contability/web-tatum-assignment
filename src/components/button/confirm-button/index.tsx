import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import { FieldErrors } from 'react-hook-form';

type ButtonTheme = 'blue' | 'gray' | 'green' | 'yellow' | 'red';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ConfirmButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 폼 에러 객체 - 에러가 있으면 버튼이 비활성화된다 */
  errors?: FieldErrors;
  /** 버튼 테마 색상 */
  theme?: ButtonTheme;
  /** 버튼 크기 */
  size?: ButtonSize;
}

/**
 * 폼 에러 여부에 따라 활성화/비활성화되는 확인 버튼 컴포넌트
 * errors 객체에 에러가 있으면 자동으로 비활성화된다
 */
const ConfirmButton = ({
  errors,
  theme = 'blue',
  size = 'md',
  children,
  className,
  disabled,
  ...props
}: PropsWithChildren<ConfirmButtonProps>) => {
  const hasErrors = errors && Object.keys(errors).length > 0;
  const isDisabled = hasErrors || disabled;

  return (
    <button
      type="button"
      disabled={isDisabled}
      className={twMerge('btn-base', isDisabled ? 'btn-disabled' : `btn-confirm-${theme}`, `btn-${size}`, className)}
      aria-disabled={isDisabled}
      {...props}
    >
      {children}
    </button>
  );
};
export default ConfirmButton;
