import React, { ReactNode } from 'react';

export interface TableCellProps {
  /** 셀 내용 */
  children: ReactNode;
  /** 추가 클래스명 */
  className?: string;
  /** 접근성을 위한 aria-label */
  ariaLabel?: string;
}

const TableCell = ({ children, className = '', ariaLabel }: TableCellProps) => {
  return (
    <div
      className={`border-b border-gray-200 p-3 transition-colors hover:bg-gray-50 ${className}`}
      role="gridcell"
      aria-label={ariaLabel}
    >
      {children}
    </div>
  );
};

export default TableCell;
