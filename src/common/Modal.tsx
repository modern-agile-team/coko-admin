import { PropsWithChildren, useEffect } from 'react';
import ModalPortal from '../ModalPortal';
import { Button, Modal as Overlay } from 'react-bootstrap';

interface ModalProps {
  isShow: boolean;
  closeModal: () => void;
  title: string;
  closeEvent?: () => void;
}
export default function Modal({
  isShow,
  closeModal,
  title,
  children,
  closeEvent,
}: PropsWithChildren<ModalProps>) {
  useEffect(() => {
    if (!isShow) {
      closeEvent && closeEvent();
    }
  }, [isShow]);

  return (
    <ModalPortal>
      <Overlay show={isShow} size="lg">
        <Overlay.Header>
          <Overlay.Title>{title}</Overlay.Title>
          <Button
            size="lg"
            variant="close"
            onClick={() => {
              closeModal();
            }}
            aria-label="Close lg"
          />
        </Overlay.Header>
        <Overlay.Body>{children}</Overlay.Body>
      </Overlay>
    </ModalPortal>
  );
}
