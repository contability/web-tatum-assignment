import React, { ReactNode } from 'react';

export interface TableBodyProps {
  /** 추가 클래스명 */
  className?: string;
  /** 바디 내용 */
  children: ReactNode;
}

const TableBody = ({ className, children }: TableBodyProps) => {
  return <div className={`contents ${className ?? ''}`}>{children}</div>;
};

export default TableBody;
