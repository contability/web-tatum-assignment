import { motion } from 'motion/react';

export interface ModalContainerProps {
  onClose?: () => void;
}

const ModalOverlay = ({ onClose }: ModalContainerProps) => {
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
    />
  );
};

export default ModalOverlay;
