'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState, type PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import ModalOverlay from './overlay';

export interface ModalProps {
  isOpen: boolean;
  className?: string;
  onClose?: () => void;
}

const Modal = ({ isOpen, onClose, className = '', children }: PropsWithChildren<ModalProps>) => {
  const [portalElement, setPortalElement] = useState<Element | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const element = document.querySelector('#root-modal');
      setPortalElement(element);
    }
  }, []);
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
  }, [isOpen]);

  if (portalElement) {
    return createPortal(
      <AnimatePresence>
        {isOpen && (
          <>
            <ModalOverlay onClose={onClose} />
            <motion.div
              className={`absolute top-1/2 left-1/2 z-[53] block w-auto -translate-x-1/2 -translate-y-1/2 px-4 ${className}`}
              initial={{
                y: 20,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              exit={{
                y: 20,
                opacity: 0,
              }}
              transition={{
                ease: 'easeInOut',
                duration: 0.3,
              }}
            >
              {children}
            </motion.div>
          </>
        )}
      </AnimatePresence>,
      portalElement,
      'root-modal',
    );
  }
  return <></>;
};

export default Modal;
