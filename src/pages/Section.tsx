import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
  Table,
} from 'react-bootstrap';
import useMoadl from '../hooks/useModal';
import sectionApis from '../apis/section';
export default function Section() {
  const { isShow, closeModal, openModal, Modal } = useMoadl();
  const { data: sections } = sectionApis.get();
  return (
    <>
      <Modal isShow={isShow} closeModal={closeModal} title="섹션 추가">
        <FloatingLabel label="섹션 입력" className="mx-2">
          <Form.Control size="sm" type="text" />
        </FloatingLabel>
      </Modal>

      <Container>
        <Row className="justify-content-end mt-3 mb-2">
          <Col xs="auto">
            <Form.Select aria-label="Default select example" className="mx-2">
              <option>정렬</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
              <option value="3">Three</option>
            </Form.Select>
          </Col>
          <Col xs="auto">
            <Button type="button" onClick={openModal}>
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
                </tr>
              ))}
            </tbody>
          </Table>
        </Row>
      </Container>
    </>
  );
}
