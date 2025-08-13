import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

type ButtonTheme = 'blue' | 'gray' | 'green' | 'yellow' | 'red';
type ButtonSize = 'sm' | 'md' | 'lg';

interface BasicButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 버튼 변형 스타일 */
  variant?: 'default' | 'outline' | 'ghost';
  /** 버튼 테마 색상 */
  theme?: ButtonTheme;
  /** 버튼 크기 */
  size?: ButtonSize;
}

/**
 * 기본 버튼 컴포넌트
 * 다양한 변형, 테마, 크기를 지원하는 범용 버튼이다
 */
const BasicButton = ({
  variant = 'outline',
  theme = 'gray',
  size = 'md',
  children,
  className,
  ...props
}: PropsWithChildren<BasicButtonProps>) => {
  return (
    <button
      type="button"
      className={twMerge('btn-base', `btn-${variant}-${theme}`, `btn-${size}`, className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default BasicButton;
