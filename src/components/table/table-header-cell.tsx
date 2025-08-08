import React, { ReactNode } from 'react';

export interface TableHeaderCellProps {
  /** 헤더 셀 내용 */
  children: ReactNode;
  /** 추가 클래스명 */
  className?: string;
  /** 접근성을 위한 aria-label */
  ariaLabel?: string;
}

const TableHeaderCell = ({ children, className = '', ariaLabel }: TableHeaderCellProps) => {
  return (
    <div
      className={`border-b-2 border-gray-300 bg-gray-100 p-3 font-semibold text-gray-700 transition-colors ${className}`}
      role="columnheader"
      aria-label={ariaLabel}
    >
      {children}
    </div>
  );
};

export default TableHeaderCell;
