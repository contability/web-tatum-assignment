import { Children, ComponentType, isValidElement, ReactNode } from 'react';

export interface TableProps {
  /** 테이블 컨테이너에 추가할 클래스명 */
  className?: string;
  /** 접근성을 위한 aria-label */
  ariaLabel?: string;
  /** 로딩 상태 */
  loading?: boolean;
  /** 빈 데이터 메시지 */
  emptyMessage?: ReactNode;
  /** 그리드 컬럼의 최소 너비 (기본값: 120px) */
  minColumnWidth?: string;
  /** 테이블 내용 */
  children: ReactNode;
}

const Table = ({
  className,
  ariaLabel = '데이터 테이블',
  loading = false,
  emptyMessage = '데이터가 없습니다.',
  minColumnWidth = '120px',
  children,
}: TableProps) => {
  const getColumnCount = () => {
    const headerElement = Children.toArray(children).find(
      child => isValidElement(child) && child.type && (child.type as ComponentType).name === 'TableHeader',
    );

    if (isValidElement(headerElement) && headerElement.props) {
      return Children.count((headerElement.props as { children: ReactNode }).children);
    }
    return 1;
  };

  const columnCount = getColumnCount();

  if (loading) {
    return (
      <div className={`flex items-center justify-center py-8 ${className ?? ''}`}>
        <div className="text-gray-500">로딩 중...</div>
      </div>
    );
  }

  if (!children) {
    return (
      <div className={`flex items-center justify-center py-8 ${className ?? ''}`}>
        <div className="text-gray-500">{emptyMessage}</div>
      </div>
    );
  }

  return (
    <div className={`scrollbar-hide overflow-x-auto ${className ?? ''}`}>
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${columnCount}, minmax(${minColumnWidth}, 1fr))`,
        }}
        role="grid"
        aria-label={ariaLabel}
      >
        {children}
      </div>
    </div>
  );
};

export default Table;
