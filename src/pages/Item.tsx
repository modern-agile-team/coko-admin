import { Button, Col, Container, Row, Table } from 'react-bootstrap';

export default function Item() {
  return (
    <Container>
      <Row className="justify-content-end mt-3 mb-2">
        <Col xs="auto">
          <Button type="button">+ 아이템 추가</Button>
        </Col>
      </Row>
      <Row>
        <Table striped="columns" bordered hover>
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>cost</th>
              <th>image</th>
            </tr>
          </thead>
          <tbody>
            <tr></tr>
          </tbody>
        </Table>
      </Row>
    </Container>
  );
}
