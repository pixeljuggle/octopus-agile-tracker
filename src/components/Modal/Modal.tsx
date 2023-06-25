import { Portal } from 'components';
import { useFocusTrap } from 'hooks/useFocusTrap';
import { ReactElement } from 'react';
import { ChildrenType } from 'types';

type ModalPropTypes = {
  isOpen: boolean;
  className?: string;
  children: ChildrenType;
};
export const Modal = ({ isOpen = false, children, className = '' }: ModalPropTypes): ReactElement | null => {
  const [ref] = useFocusTrap();

  if (!isOpen) return null;

  return (
    <Portal elementId="modal-portal">
      <div
        className={className}
        style={{
          position: 'fixed',
          zIndex: 1000,
          inset: 0,
          background: 'rgba(74, 74, 106, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          ref={ref}
          id="modal"
          role="dialog"
          tabIndex={-1}
          aria-labelledby="modal-title"
          className=" relative overflow-hidden"
          style={{ maxHeight: '90vh', maxWidth: '90vw' }}
        >
          {children}
        </div>
      </div>
    </Portal>
  );
};
