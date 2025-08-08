import React, { ReactNode } from 'react';

export interface MobileCardFieldProps {
  /** 필드 라벨 */
  label: string;
  /** 필드 값 */
  children: ReactNode;
  /** 추가 클래스명 */
  className?: string;
}

const MobileCardField = ({ label, children, className }: MobileCardFieldProps) => {
  return (
    <div className={className}>
      <dt className="mb-1 font-medium text-gray-600">{label}</dt>
      <dd className="text-sm">{children}</dd>
    </div>
  );
};

export default MobileCardField;
