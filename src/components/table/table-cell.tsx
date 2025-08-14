import React, { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export interface TableCellProps {
  /** 셀 내용 */
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

const TableCell = ({ children, className = '', ariaLabel, sticky, stickyOffset = 0 }: TableCellProps) => {
  const getStickyStyles = () => {
    if (!sticky) return {};

    return {
      position: 'sticky' as const,
      [sticky]: `${stickyOffset}rem`,
      zIndex: 5,
    };
  };

  return (
    <div
      className={twMerge(
        'border-b border-gray-200 p-3 transition-colors hover:bg-gray-50',
        !!sticky && 'bg-white',
        className,
      )}
      style={getStickyStyles()}
      role="gridcell"
      aria-label={ariaLabel}
    >
      {children}
    </div>
  );
};

export default TableCell;
