'use client';

import { LabelValuePair } from '@DataTypes/pair';
import { parseValue } from '@Utils/parse-value';
import { useState, useRef, useEffect, type ChangeEvent } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { twMerge } from 'tailwind-merge';

interface SelectProps {
  optionList: LabelValuePair[];
  value: string;
  register?: UseFormRegisterReturn;
  className?: string;
}

const Select = ({ optionList, value, register, className }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const selectedOption = optionList.find(option => parseValue(option.value) === parseValue(value))?.label || '선택';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target as Node)) setIsOpen(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleSelectOption = (optionId: string | number) => {
    if (register) {
      register.onChange({
        target: {
          name: register.name,
          value: parseValue(optionId),
        },
      } as ChangeEvent<HTMLInputElement>);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={twMerge(
          'flex w-full items-center justify-between rounded-md border border-gray-300 bg-white p-2 px-3 text-left text-base transition-all duration-200 hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none md:text-lg lg:p-3 lg:text-xl',
          isOpen ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-300',
          className,
        )}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="truncate text-gray-800">{selectedOption}</span>
        <MdOutlineKeyboardArrowDown
          size={20}
          className={`ml-2 flex-shrink-0 text-gray-800 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <ul
          role="listbox"
          className="ring-opacity-5 absolute z-60 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-200 bg-white py-1 shadow-lg ring-1 ring-black"
        >
          {optionList.map(option => (
            <li
              key={`select-box__link-${option.value}`}
              role="option"
              aria-selected={parseValue(option.value) === parseValue(value)}
            >
              <button
                onClick={() => handleSelectOption(option.value)}
                className={`flex w-full items-center px-3 py-2 text-left text-base transition-colors duration-150 hover:bg-blue-50 md:text-lg ${
                  parseValue(option.value) === parseValue(value)
                    ? 'bg-blue-50 font-medium text-blue-600'
                    : 'text-gray-800'
                }`}
              >
                <span className="truncate">{option.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
      {register && <input type="hidden" aria-hidden="true" {...register} />}
    </div>
  );
};

export default Select;
