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
import partsQueries from '../features/part/queries';
import PartSearchBar from '../features/part/ui/PartSearchBar';
import { useState } from 'react';
import { QuizFilters } from '../features/quiz/types';
import useDragAndDrop from '../hooks/useDragandDrop';
export default function Part() {
  const [filters, setFilters] = useState<Omit<QuizFilters, 'partId'>>({
    sectionId: 0,
  });

  const { isShow, openModal, closeModal, Modal } = useModal();
  const { handleDragEnd, handleDragEnter, handleDragLeave, handleDragStart } =
    useDragAndDrop();

  const { data: parts } = partsQueries.getParts(filters);
  const { mutate: deletePart } = partsQueries.deletePart();
  const { mutate: updatePartOrder } = partsQueries.updatePartOrder();
  return (
    <>
      <Modal title="파트 추가" isShow={isShow} closeModal={closeModal}>
        <PartForm closeModal={closeModal} />
      </Modal>
      <Container>
        <Row className="justify-content-end mt-3 mb-2">
          <PartSearchBar setFilters={setFilters} />
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
                <tr
                  key={part.id}
                  draggable
                  onDragStart={e => {
                    handleDragStart(e, part.id);
                  }}
                  onDragEnter={e => {
                    handleDragEnter(e, part.id, part.order);
                  }}
                  onDragEnd={e => {
                    handleDragEnd(e, (from, to) => {
                      updatePartOrder({
                        id: from,
                        order: to,
                      });
                    });
                  }}
                  onDragLeave={e => handleDragLeave(e, part.id)}
                  onDragOver={e => e.preventDefault()}
                >
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
                            deletePart(part.id);
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
