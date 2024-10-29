import {
  Button,
  Col,
  Container,
  Form,
  Navbar,
  Row,
  Table,
} from 'react-bootstrap';
import { useState } from 'react';
import CreateQuizModal from '../component/CreateQuizModal';

export default function Quiz() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const handleModal = () => {
    setShowModal(prev => !prev);
  };
  return (
    <>
      <Container>
        <Navbar className="bg-body-tertiary justify-content-between">
          <Form className="ms-auto">
            <Row>
              <Col xs="auto">
                <Form.Control
                  type="text"
                  placeholder="검색안됩니다"
                  className=" mr-sm-2"
                />
              </Col>
              <Col xs="auto">
                <Button type="button" onClick={handleModal}>
                  + 퀴즈 추가
                </Button>
              </Col>
            </Row>
          </Form>
          <CreateQuizModal
            show={showModal}
            setShow={handleModal}
          ></CreateQuizModal>
        </Navbar>
      </Container>
      <Container>
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
      </Container>
    </>
  );
}
