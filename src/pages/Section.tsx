import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Row,
  Table,
} from 'react-bootstrap';
import useModal from '../hooks/useModal';
import SectionForm from '../features/section/ui/SectionForm';
import sectionsQueries from '../features/section/queries';
import type { Section } from '../features/section/types';
import SkeletonLoader from '../common/SkeletonLoader';
import useDragAndDrop, { DragEndEvent } from '../hooks/useDragAndDrop';

export default function Section() {
  const { isShow, closeModal, openModal, Modal } = useModal();
  const { data: sections, isLoading } = sectionsQueries.getSections();
  const { mutate: deleteSection } = sectionsQueries.deleteSection();
  const { mutate: updateSectionOrder } = sectionsQueries.updateSectionOrder();
  const { onDragEnd, onDragEnter, onDragLeave, onDragStart } = useDragAndDrop();

  const dragEndEvent: DragEndEvent = (from, to) => {
    updateSectionOrder({
      id: from,
      order: to,
    });
  };

  return (
    <>
      <Modal isShow={isShow} closeModal={closeModal} title="섹션 추가">
        <SectionForm closeModal={closeModal} />
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
              + 섹션 추가
            </Button>
          </Col>
        </Row>
        <Row>
          <Table striped="columns" bordered hover translate="yes">
            <thead>
              <tr className="bg-primary">
                <th>order</th>
                <th>id</th>
                <th>section</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <SkeletonLoader columnsCount={4} rowsCount={3} />
              ) : (
                sections?.map((section, index) => (
                  <tr
                    id={`section${section.id}`}
                    key={section.id}
                    draggable
                    onDragStart={e => onDragStart(e, { from: section.id })}
                    onDragEnter={e =>
                      onDragEnter(e, { from: section.id, to: section.order })
                    }
                    onDragEnd={e => {
                      onDragEnd(e, {
                        dragEndEvent,
                      });
                    }}
                    onDragLeave={e => onDragLeave(e, { from: section.id })}
                    onDragOver={e => e.preventDefault()}
                  >
                    <td>{section.order}</td>
                    <td>{section.id}</td>
                    <td>{section.name}</td>
                    <td
                      className="d-flex justify-content-end"
                      style={{ minWidth: '120px' }}
                    >
                      <ButtonGroup size="sm" aria-label="Basic example">
                        <Button
                          variant="secondary"
                          onClick={() => {
                            if (confirm('삭제 하시겠습니까?')) {
                              deleteSection(section.id);
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
