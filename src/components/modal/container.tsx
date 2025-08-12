import { motion } from 'motion/react';
import type { PropsWithChildren } from 'react';

export interface ModalContainerProps {
  onClose?: () => void;
}

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
      className="fixed inset-0 z-[52] flex h-dvh bg-black/70"
      onClick={onClose}
      aria-modal="true"
      onKeyDown={e => {
        if (e.key === 'Escape') {
          onClose?.();
        }
      }}
    >
      <div
        className="absolute top-1/2 left-1/2 z-[53] w-full min-w-[25rem] -translate-x-1/2 -translate-y-1/2 md:min-w-[50rem]"
        onClick={e => e.stopPropagation()}
        role="presentation"
      >
        {children}
      </div>
    </motion.div>
  );
};

export default ModalContainer;
