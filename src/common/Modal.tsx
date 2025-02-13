import { PropsWithChildren } from 'react';
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
  return (
    <ModalPortal>
      <Overlay show={isShow} size="lg">
        <Overlay.Header>
          <Overlay.Title>{title}</Overlay.Title>
          <Button
            size="lg"
            variant="close"
            onClick={() => {
              closeEvent && closeEvent();
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
