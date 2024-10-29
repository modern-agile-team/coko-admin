import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap';
import { useState } from 'react';

export default function Section() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const handleModal = () => {
    setShowModal(prev => !prev);
  };
  return (
    <>
      <Container>
        <Row className="justify-content-end mt-3 mb-2">
          <Col xs="auto">
            <Form.Select aria-label="Default select example" className="mx-2">
              <option>섹션</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
              <option value="3">Three</option>
            </Form.Select>
          </Col>
          <Col xs="auto">
            <Form.Select aria-label="Default select example" className="mx-2">
              <option>파트</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
              <option value="3">Three</option>
            </Form.Select>
          </Col>
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="검색안됩니다"
              className=" mr-sm-2"
            />
          </Col>
          <Col xs="auto">
            <Button type="button">검색</Button>
          </Col>
          <Col xs="auto">
            <Button type="button" onClick={handleModal}>
              + 퀴즈 추가
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
                <th>question</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>variable</td>
                <td>let</td>
                <td>let a...</td>
              </tr>
            </tbody>
          </Table>
        </Row>
      </Container>
    </>
  );
}
