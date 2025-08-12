'use client';

import { type InputHTMLAttributes, forwardRef, type ForwardedRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = (props: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
  const { type = 'text', className = '', id, value, defaultValue, name, placeholder, ...restProps } = props;

  return (
    <div className="relative w-full">
      <input
        ref={ref}
        {...restProps}
        name={name}
        type={type}
        value={value}
        defaultValue={defaultValue}
        autoComplete="new-password"
        placeholder={placeholder}
        id={id}
        className={twMerge(
          'w-full rounded-md border border-gray-300 bg-white p-2 text-base text-gray-800 placeholder-gray-500 transition-colors duration-200 hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none md:text-lg lg:p-3 lg:text-xl',
          className,
        )}
      />
    </div>
  );
};

Input.displayName = 'Input';
export default forwardRef(Input);
