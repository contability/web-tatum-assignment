import { motion } from 'motion/react';
import type { PropsWithChildren } from 'react';

export interface ModalContainerProps {
  onClose?: () => void;
}

// FIXME: 모달 크기 동적으로 조절할 수 있도록 변경 필요
const ModalContainer = ({ onClose, children }: PropsWithChildren<ModalContainerProps>) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        ease: 'easeInOut',
        duration: 0.3,
      }}
      className="fixed inset-0 z-[52] flex h-dvh items-center justify-center bg-black/70"
      onClick={onClose}
      aria-modal="true"
      onKeyDown={e => {
        if (e.key === 'Escape') {
          onClose?.();
        }
      }}
    >
      <div className="w-fit px-4" onClick={e => e.stopPropagation()} role="presentation">
        {children}
      </div>
    </motion.div>
  );
};

export default ModalContainer;
