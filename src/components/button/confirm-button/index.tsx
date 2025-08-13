import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

type ButtonTheme = 'blue' | 'gray' | 'green' | 'yellow' | 'red';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ConfirmButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 폼 유효성 상태 - false이면 버튼이 비활성화된다 */
  isValid?: boolean;
  /** 버튼 테마 색상 */
  theme?: ButtonTheme;
  /** 버튼 크기 */
  size?: ButtonSize;
}

const ConfirmButton = ({
  isValid,
  theme = 'blue',
  size = 'md',
  children,
  className,
  disabled,
  ...props
}: PropsWithChildren<ConfirmButtonProps>) => {
  const isDisabled = (isValid !== undefined && !isValid) || disabled;

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
