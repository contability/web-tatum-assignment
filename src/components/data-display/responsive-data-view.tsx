import { ReactNode } from 'react';

interface ResponsiveDataViewProps {
  /** 컨테이너에 추가할 클래스명 */
  className?: string;
  /** 데스크톱 화면에서 보여줄 테이블 형태의 내용 */
  desktopView: ReactNode;
  /** 모바일 화면에서 보여줄 카드 리스트 형태의 내용 */
  mobileView: ReactNode;
  /** 접근성을 위한 aria-label */
  ariaLabel?: string;
}

/**
 * 반응형 데이터 표시 컴포넌트
 *
 * 화면 크기에 따라 다른 형태로 동일한 데이터를 표시한다:
 * - 데스크톱 (md 이상): 테이블 형태
 * - 모바일 (md 미만): 카드 리스트 형태
 */
const ResponsiveDataView = ({
  className,
  desktopView,
  mobileView,
  ariaLabel = '데이터 목록',
}: ResponsiveDataViewProps) => {
  return (
    <div className={className}>
      <div className="hidden md:block" aria-label={ariaLabel}>
        {desktopView}
      </div>

      <div className="space-y-4 md:hidden" role="list" aria-label={ariaLabel}>
        {mobileView}
      </div>
    </div>
  );
};

export default ResponsiveDataView;
