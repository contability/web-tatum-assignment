import React, { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export interface MobileCardProps {
  /** 카드 내용 */
  children: ReactNode;
  /** 추가 클래스명 */
  className?: string;
  /** 카드 제목 */
  title?: ReactNode;
  /** 액션 버튼들 */
  actions?: ReactNode;
}

const MobileCard = ({ children, className, title, actions }: MobileCardProps) => {
  return (
    <article
      className={twMerge(
        'rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md',
        className,
      )}
      role="listitem"
    >
      {title && (
        <div className="mb-3 flex items-start justify-between">
          <div className="flex-1">{title}</div>
          {actions && <div className="flex gap-2">{actions}</div>}
        </div>
      )}

      <div className="space-y-3">{children}</div>

      {!title && actions && <div className="mt-3 flex justify-end gap-2 border-t border-gray-100 pt-3">{actions}</div>}
    </article>
  );
};

export default MobileCard;
