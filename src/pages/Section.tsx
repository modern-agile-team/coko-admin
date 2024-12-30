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
export default function Section() {
  const { isShow, closeModal, openModal, Modal } = useModal();

  const { data: sections } = sectionsQueries.getSections();
  const deleteMutation = sectionsQueries.deleteSection();

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
          <Table striped="columns" bordered hover>
            <thead>
              <tr>
                <th>id</th>
                <th>section</th>
              </tr>
            </thead>
            <tbody>
              {sections?.map(section => (
                <tr key={section.id}>
                  <td>{section.id}</td>
                  <td>{section.name}</td>
                  <td className="d-flex justify-content-end">
                    <ButtonGroup size="sm" aria-label="Basic example">
                      <Button
                        variant="secondary"
                        onClick={() => {
                          openModal();
                        }}
                      >
                        수정
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => {
                          deleteMutation.mutate(section.id);
                          if (confirm('삭제 하시겠습니까?')) {
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
