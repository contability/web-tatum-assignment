import React, { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export interface TableHeaderCellProps {
  /** 헤더 셀 내용 */
  children: ReactNode;
  /** 추가 클래스명 */
  className?: string;
  /** 접근성을 위한 aria-label */
  ariaLabel?: string;
  /** sticky 위치 (right 또는 left) */
  sticky?: 'left' | 'right';
  /** sticky일 때 위치값 (rem) */
  stickyOffset?: number;
}

const TableHeaderCell = ({ children, className = '', ariaLabel, sticky, stickyOffset = 0 }: TableHeaderCellProps) => {
  const getStickyStyles = () => {
    if (!sticky) return {};

    return {
      position: 'sticky' as const,
      [sticky]: `${stickyOffset}rem`,
      zIndex: 10,
    };
  };

  return (
    <div
      className={twMerge(
        'border-b-2 border-gray-300 bg-gray-100 p-3 font-semibold text-gray-700 transition-colors',
        className,
      )}
      style={getStickyStyles()}
      role="columnheader"
      aria-label={ariaLabel}
    >
      {children}
    </div>
  );
};

export default TableHeaderCell;
