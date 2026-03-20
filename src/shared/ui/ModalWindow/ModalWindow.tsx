import React, { createContext, useContext, useState, ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { cn } from '@/lib/utils';

interface ModalContextType {
  open: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

interface ModalWindowProps {
  trigger?: ReactNode | (({ open }: { open: () => void }) => ReactNode);
  children: ReactNode | (({ close }: { close: () => void }) => ReactNode);
}

export const ModalWindow = ({ trigger, children }: ModalWindowProps) => {
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const renderTrigger = () => {
    if (!trigger) return null;
    if (typeof trigger === 'function') {
      return trigger({ open: openModal });
    }
    if (React.isValidElement<{ onClick?: React.MouseEventHandler }>(trigger)) {
      const existingOnClick = trigger.props.onClick;
      const handleClick: React.MouseEventHandler = (e) => {
        existingOnClick?.(e);
        openModal();
      };
      return React.cloneElement(trigger, {
        onClick: handleClick,
      });
    }
    return null;
  };

  const renderContent = () => {
    if (typeof children === 'function') {
      return children({ close: closeModal });
    }
    return children;
  };

  return (
    <ModalContext.Provider value={{ open, openModal, closeModal }}>
      {renderTrigger()}
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          <Dialog.Content
            aria-describedby={undefined}
            className="fixed top-1/2 left-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg"
          >
            <span id="modal-description" className="sr-only">
              Модальное окно
            </span>
            {renderContent()}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </ModalContext.Provider>
  );
};

// Header
const ModalWindowHeader = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => <Dialog.Title className={cn('text-lg font-semibold', className)}>{children}</Dialog.Title>;
ModalWindowHeader.displayName = 'ModalWindow.Header';
ModalWindow.Header = ModalWindowHeader;

// Body
const ModalWindowBody = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={cn('py-4', className)}>{children}</div>
);
ModalWindowBody.displayName = 'ModalWindow.Body';
ModalWindow.Body = ModalWindowBody;

// Footer
const ModalWindowFooter = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => <div className={cn('flex justify-end gap-2', className)}>{children}</div>;
ModalWindowFooter.displayName = 'ModalWindow.Footer';
ModalWindow.Footer = ModalWindowFooter;

// Close
const ModalWindowClose = ({ children }: { children: ReactNode }) => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('ModalWindow.Close must be used within a ModalWindow');
  }
  const { closeModal } = context;
  return (
    <Dialog.Close asChild onClick={closeModal}>
      {children}
    </Dialog.Close>
  );
};
ModalWindowClose.displayName = 'ModalWindow.Close';
ModalWindow.Close = ModalWindowClose;
