'use client';

import { memo } from 'react';
import { TbEdit } from 'react-icons/tb';

interface EditCloudButtonProps {
  cloudName: string;
  onClick: () => void;
  size?: number;
}

const EditCloudButton = ({ cloudName, onClick, size = 20 }: EditCloudButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${cloudName} 클라우드 수정`}
      className="transition-colors hover:opacity-70"
    >
      <TbEdit className="text-primary-blue" size={size} />
    </button>
  );
};

EditCloudButton.displayName = 'EditCloudButton';
export default memo(EditCloudButton);
