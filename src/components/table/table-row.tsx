import React, { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export interface TableRowProps {
  /** 추가 클래스명 */
  className?: string;
  /** 행 내용 */
  children: ReactNode;
}

const TableRow = ({ className, children }: TableRowProps) => {
  return (
    <div className={twMerge('contents', className)} role="row">
      {children}
    </div>
  );
};

export default TableRow;
