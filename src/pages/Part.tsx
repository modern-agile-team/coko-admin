import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Row,
  Table,
} from 'react-bootstrap';
import useModal from '../hooks/useModal';
import PartForm from '../features/part/ui/PartForm';
import type { Part } from '../features/part/types';
import { partsQueries, partsQuery } from '../features/part/queries';
import { useEffect } from 'react';

export default function Part() {
  const { isShow, openModal, closeModal, Modal } = useModal();

  const { data: parts } = partsQueries.read();
  const deleteMutation = partsQueries.delete();
  const { mutate: updatePartOrder } = partsQuery.patch();

  return (
    <>
      <Modal title="파트 추가" isShow={isShow} closeModal={closeModal}>
        <PartForm closeModal={closeModal} />
      </Modal>

      <Container>
        <Row className="justify-content-end mt-3 mb-2">
          <Col xs="auto">
            <Button
              type="button"
              onClick={() => {
                openModal();
              }}
            >
              + 파트 추가
            </Button>
          </Col>
        </Row>
        <Row>
          <Table striped="columns" bordered hover>
            <thead>
              <tr>
                <th>order</th>
                <th>id</th>
                <th>sectionId</th>
                <th>part</th>
              </tr>
            </thead>
            <tbody>
              {parts?.map(part => (
                <tr key={part.id}>
                  <td>{part.order}</td>
                  <td>{part.id}</td>
                  <td>{part.sectionId}</td>
                  <td>{part.name}</td>
                  <td className="d-flex justify-content-end">
                    <ButtonGroup size="sm" aria-label="Basic example">
                      <Button
                        variant="secondary"
                        onClick={() => {
                          if (confirm('삭제 하시겠습니까?')) {
                            deleteMutation.mutate(part.id);
                          }
                        }}
                      >
                        삭제
                      </Button>
                    </ButtonGroup>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Row>
      </Container>
    </>
  );
}
