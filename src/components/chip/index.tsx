import { PropsWithChildren } from 'react';

export interface ChipProps {
  /** Chip 변형 타입 */
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
  /** 추가 클래스명 */
  className?: string;
  /** 접근성을 위한 label */
  ariaLabel?: string;
}

const chipVariants = {
  primary: 'bg-blue-100 text-blue-800',
  success: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  error: 'bg-red-100 text-red-800',
  info: 'bg-cyan-100 text-cyan-800',
  neutral: 'bg-gray-100 text-gray-800',
} as const;

const Chip = ({ children, variant = 'neutral', className = '', ariaLabel }: PropsWithChildren<ChipProps>) => {
  const variantClasses = chipVariants[variant];

  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium whitespace-pre md:px-3 md:py-1 md:text-sm ${variantClasses} ${className}`}
      aria-label={ariaLabel}
      role="status"
    >
      {children}
    </span>
  );
};

export default Chip;
