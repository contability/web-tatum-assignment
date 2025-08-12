'use client';

import { type PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import type { FieldError } from 'react-hook-form';

interface Label {
  id?: string;
  content: string;
}

interface FormFieldProps {
  label?: Label;
  error?: FieldError;
  labelClassName?: string;
  className?: string;
  isLineBreak?: boolean;
  isRequired?: boolean;
}

const FormField = ({
  label,
  error,
  isLineBreak = false,
  labelClassName = '',
  className = '',
  isRequired = false,
  children,
}: PropsWithChildren<FormFieldProps>) => {
  return (
    <div className={twMerge('flex flex-col', className)}>
      <div
        className={twMerge('flex items-center gap-2 lg:gap-3', isLineBreak && 'flex-col items-baseline gap-1 lg:gap-1')}
      >
        {label?.content && (
          <label
            htmlFor={label.id}
            className={twMerge(
              'mb-1 block w-fit text-sm font-medium whitespace-pre text-gray-700 md:text-base lg:text-lg',
              isLineBreak && 'w-full',
              labelClassName,
            )}
          >
            {label.content}
            {isRequired && (
              <span className="ml-1 text-red-500" aria-label="필수 입력">
                *
              </span>
            )}
          </label>
        )}
        {children}
      </div>
      {error && (
        <p className={twMerge('mt-1 ml-[6rem] text-sm text-red-600', isLineBreak && 'ml-0')} role="alert">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default FormField;
