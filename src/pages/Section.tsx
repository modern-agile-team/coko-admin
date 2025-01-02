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
import '../features/section/ui/styles.css';
import useDragAndDrop from '../hooks/useDragandDrop';
export default function Section() {
  const { isShow, closeModal, openModal, Modal } = useModal();

  const { data: sections } = sectionsQueries.getSections();
  const { mutate: deleteSection } = sectionsQueries.deleteSection();
  const { mutate: updateSectionOrder } = sectionsQueries.updateSectionOrder();
  const { handleDragEnd, handleDragEnter, handleDragLeave, handleDragStart } =
    useDragAndDrop();

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
              {sections?.map((section, index) => (
                <tr
                  id={`section${section.id}`}
                  key={section.id}
                  draggable
                  onDragStart={e => handleDragStart(e, section.id)}
                  onDragEnter={e =>
                    handleDragEnter(e, section.id, section.order)
                  }
                  onDragEnd={e => {
                    handleDragEnd(e, (from, to) => {
                      updateSectionOrder({
                        id: from,
                        order: to,
                      });
                    });
                  }}
                  onDragLeave={e => handleDragLeave(e, section.id)}
                  onDragOver={e => e.preventDefault()}
                >
                  <td>{index + 1}</td>
                  <td>{section.id}</td>
                  <td>{section.name}</td>
                  <td className="d-flex justify-content-end">
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
              ))}
            </tbody>
          </Table>
        </Row>
      </Container>
    </>
  );
}
