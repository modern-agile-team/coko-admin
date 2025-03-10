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
import type { Part, PartFilter } from '../features/part/types';
import partsQueries from '../features/part/queries';
import PartSearchBar from '../features/part/ui/PartSearchBar';
import { useState } from 'react';
import SkeletonLoader from '../common/SkeletonLoader';
import useDragAndDrop, { DragEndEvent } from '../hooks/useDragAndDrop';
import Header from '../common/Header';

export default function Part() {
  const [partFilter, setPartFilter] = useState<PartFilter>({
    sectionId: 0,
  });

  const { isShow, openModal, closeModal, Modal } = useModal();
  const { onDragEnd, onDragEnter, onDragLeave, onDragStart } = useDragAndDrop();

  const { data: parts, isLoading } = partsQueries.getFilteredParts(partFilter);
  const { mutate: deletePart } = partsQueries.deletePart();
  const { mutate: updatePartOrder } = partsQueries.updatePartOrder();

  const dragEndEvent: DragEndEvent = (from, to) => {
    updatePartOrder({
      id: from,
      order: to,
    });
  };
  return (
    <>
      <Header />
      <Modal title="파트 추가" isShow={isShow} closeModal={closeModal}>
        <PartForm closeModal={closeModal} />
      </Modal>
      <Container>
        <Row className="justify-content-end mt-3 mb-2">
          <PartSearchBar setPartFilter={setPartFilter} />
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
            <colgroup>
              <col width="15%" />
              <col width="15%" />
              <col width="15%" />
              <col width="20%" />
              <col width="20%" />
            </colgroup>
            <thead>
              <tr>
                <th>order</th>
                <th>id</th>
                <th>sectionId</th>
                <th>part</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <SkeletonLoader columnsCount={5} rowsCount={3} />
              ) : (
                parts?.map(part => (
                  <tr
                    key={part.id}
                    draggable
                    onDragStart={e => {
                      onDragStart(e, { from: part.id });
                    }}
                    onDragEnter={e => {
                      onDragEnter(e, { from: part.id, to: part.order });
                    }}
                    onDragEnd={e => {
                      onDragEnd(e, {
                        dragEndEvent,
                      });
                    }}
                    onDragLeave={e => onDragLeave(e, { from: part.id })}
                    onDragOver={e => e.preventDefault()}
                  >
                    <td>{part.order}</td>
                    <td>{part.id}</td>
                    <td>{part.sectionId}</td>
                    <td>{part.name}</td>
                    <td
                      className="d-flex justify-content-end"
                      style={{ minWidth: '120px' }}
                    >
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
                ))
              )}
            </tbody>
          </Table>
        </Row>
      </Container>
    </>
  );
}
