'use client';

import { type ReactNode } from 'react';
import Modal, { type ModalProps } from '..';

interface MessageModalProps extends ModalProps {
  className?: string;
  message: ReactNode;
  title?: string;
  confirmText?: string;
  onConfirm: () => void;
}

const MessageModal = ({
  isOpen,
  className,
  message,
  title,
  confirmText = '확인',
  onConfirm,
  onClose,
}: MessageModalProps) => {
  const handleConfirm = () => {
    onConfirm();
    onClose?.();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div
        className={`mx-auto w-full max-w-md rounded-lg bg-white p-6 shadow-lg transition-all duration-300 ease-in-out ${className || ''}`}
      >
        {title && (
          <div className="mb-4 border-b border-gray-200 pb-3">
            <h3 className="text-forest text-center text-xl font-bold">{title}</h3>
          </div>
        )}

        <div className="mb-6 text-center text-gray-700">{message}</div>

        <div className="flex justify-center">
          <button onClick={handleConfirm} className="min-w-[120px] px-6 py-2 text-base">
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default MessageModal;
