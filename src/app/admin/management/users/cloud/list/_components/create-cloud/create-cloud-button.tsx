'use client';

import { memo } from 'react';
import { FiPlus } from 'react-icons/fi';

interface CreateCloudButtonProps {
  onClick: () => void;
}

const CreateCloudButton = ({ onClick }: CreateCloudButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 rounded-md border border-primary-blue px-4 py-3 text-primary-blue transition-colors hover:bg-primary-blue-light"
      aria-label="클라우드 생성 모달 열기"
    >
      <FiPlus size={10} className="text-primary-blue" aria-hidden="true" />
      <span>Create Cloud</span>
    </button>
  );
};

CreateCloudButton.displayName = 'CreateCloudButton';
export default memo(CreateCloudButton);
