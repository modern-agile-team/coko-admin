import { ReactNode } from 'react';
import ModalPortal from '../ModalPortal';
import { Button, Modal as Overray } from 'react-bootstrap';
import useModal from '../store/useModal';
interface ModalProps {
  title: string;
  children: ReactNode;
  submitEvnet?: () => void;
}
export default function Modal({ title, children, submitEvnet }: ModalProps) {
  const { isShow, closeModal } = useModal();
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
