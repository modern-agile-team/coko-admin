import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
  Table,
} from 'react-bootstrap';
import useModal from '../store/useModal';
import Modal from '../component/Modal';

export default function Part() {
  const { openModal } = useModal();

  return (
    <>
      <Modal title="파트 추가">
        <Form.Select className="mb-3">
          <option>섹션 선택</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Form.Select>
        <FloatingLabel label="파트 입력">
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
              + 파트 추가
            </Button>
          </Col>
        </Row>
        <Row>
          <Table striped="columns" bordered hover>
            <thead>
              <tr>
                <th>id</th>
                <th>section</th>
                <th>part</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>variable</td>
                <td>let</td>
              </tr>
            </tbody>
          </Table>
        </Row>
      </Container>
    </>
  );
}
