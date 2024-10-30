import { PropsWithChildren } from 'react';
import ModalPortal from '../ModalPortal';
import { Button, Modal as Overray } from 'react-bootstrap';

interface ModalProps {
  isShow: boolean;
  closeModal: () => void;
  title: string;
  submitEvnet?: () => void;
}
export default function Modal({
  isShow,
  closeModal,
  title,
  children,
  submitEvnet,
}: PropsWithChildren<ModalProps>) {
  return (
    <ModalPortal>
      <Overray show={isShow} size="lg">
        <Overray.Header>
          <Overray.Title>{title}</Overray.Title>
          <Button
            size="lg"
            variant="close"
            onClick={closeModal}
            aria-label="Close lg"
          />
        </Overray.Header>
        <Overray.Body>{children}</Overray.Body>
        <Overray.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              submitEvnet && submitEvnet();
              closeModal();
            }}
          >
            Submit
          </Button>
        </Overray.Footer>
      </Overray>
    </ModalPortal>
  );
}
