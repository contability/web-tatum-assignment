import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: 'blue' | 'gray' | 'green' | 'yellow' | 'red';
}

const ActionButton = ({ theme = 'blue', children, className, ...props }: PropsWithChildren<ActionButtonProps>) => {
  const themeClasses = {
    blue: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
    gray: 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-500',
    green: 'bg-green-600 hover:bg-green-700 focus:ring-green-500',
    yellow: 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500',
    red: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
  };

  return (
    <button
      type="button"
      className={twMerge(
        'rounded px-3 py-1 text-sm text-white transition-colors focus:ring-2 focus:ring-offset-1 focus:outline-none',
        themeClasses[theme],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default ActionButton;
