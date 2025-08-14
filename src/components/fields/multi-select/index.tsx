'use client';

import { LabelValuePair } from '@DataTypes/pair';
import { parseValue } from '@Utils/parse-value';
import { useState, useRef, useEffect, type ChangeEvent } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { twMerge } from 'tailwind-merge';

interface MultiSelectProps {
  optionList: LabelValuePair[];
  value?: string[];
  register?: UseFormRegisterReturn;
  className?: string;
  isDisabled?: boolean;
  placeholder?: string;
}

const MultiSelect = ({
  optionList,
  value = [],
  register,
  className,
  isDisabled = false,
  placeholder = 'Please select value.',
}: MultiSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOptions = optionList.filter(option => {
    const parsedValue = parseValue(option.value);
    return value.includes(parsedValue || '');
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleSelectOption = (optionValue: string | number, isDisabledOption?: boolean) => {
    if (isDisabledOption || isDisabled) return;

    const parsedValue = parseValue(optionValue);
    const stringValue = parsedValue || '';
    const currentValue = value;
    let newValue: string[];

    if (currentValue.includes(stringValue)) {
      // 이미 선택된 경우 제거
      newValue = currentValue.filter(v => v !== stringValue);
    } else {
      // 선택되지 않은 경우 추가
      newValue = [...currentValue, stringValue];
    }

    if (register?.onChange) {
      register.onChange({
        target: {
          name: register.name || '',
          value: newValue,
        },
      } as unknown as ChangeEvent<HTMLInputElement>);
    }
    // multi select에서는 선택 후에도 드롭다운을 열린 상태로 유지
  };

  const getDisplayText = () => {
    if (selectedOptions.length === 0) {
      return placeholder;
    }

    if (selectedOptions.length === 1) {
      return selectedOptions[0].label;
    }

    const firstOption = selectedOptions[0];
    const remainingCount = selectedOptions.length - 1;
    return `${firstOption.label} and ${remainingCount} more`;
  };

  const displayText = getDisplayText();

  return (
    <div ref={containerRef} className="relative w-full">
      <button
        onClick={() => !isDisabled && setIsOpen(!isOpen)}
        disabled={isDisabled}
        className={twMerge(
          'flex w-full items-center justify-between rounded-md border border-gray-300 bg-white p-2 px-3 text-left text-base transition-all duration-200 hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none md:text-lg lg:p-3 lg:text-xl',
          isOpen ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-300',
          isDisabled ? 'cursor-not-allowed bg-gray-50 opacity-50' : '',
          className,
        )}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-disabled={isDisabled}
      >
        <span className={twMerge('truncate', selectedOptions.length > 0 ? 'text-gray-800' : 'text-gray-500')}>
          {displayText}
        </span>
        <MdOutlineKeyboardArrowDown
          size={20}
          className={`ml-2 flex-shrink-0 text-gray-800 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && !isDisabled && (
        <ul
          role="listbox"
          aria-multiselectable="true"
          className="ring-opacity-5 absolute z-60 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-200 bg-white py-1 shadow-lg ring-1 ring-black"
        >
          {optionList.map(option => {
            const parsedValue = parseValue(option.value);
            const isSelected = value.includes(parsedValue || '');
            return (
              <li key={`multi-select-box__option-${option.value}`} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  onClick={() => handleSelectOption(option.value, option.disabled)}
                  disabled={option.disabled}
                  aria-disabled={option.disabled}
                  className={twMerge(
                    'flex w-full items-center px-3 py-2 text-left text-base transition-colors duration-150 md:text-lg',
                    option.disabled
                      ? 'cursor-not-allowed bg-gray-50 text-gray-400'
                      : isSelected
                        ? 'bg-blue-50 font-medium text-blue-600 hover:bg-blue-100'
                        : 'text-gray-800 hover:bg-blue-50',
                  )}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    className="mr-3 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    tabIndex={-1}
                    aria-hidden="true"
                    readOnly
                  />
                  <span className="truncate">{option.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {register && <input type="hidden" aria-hidden="true" {...register} value={JSON.stringify(value)} />}
    </div>
  );
};

export default MultiSelect;
