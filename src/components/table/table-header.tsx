import React, { ReactNode } from 'react';

export interface TableHeaderProps {
  /** 추가 클래스명 */
  className?: string;
  /** 헤더 내용 */
  children: ReactNode;
}

const TableHeader = ({ className, children }: TableHeaderProps) => {
  return (
    <div className={`contents ${className ?? ''}`} role="row">
      {children}
    </div>
  );
};

export default TableHeader;
