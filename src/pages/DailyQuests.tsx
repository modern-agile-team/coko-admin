import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import Header from '../common/Header';

export default function DailyQuests() {
  return (
    <>
      <Header />
      <Container>
        <Row className="justify-content-end mt-3 mb-2">
          <Col xs="auto">
            <Button type="button">+ 퀴즈 추가</Button>
          </Col>
        </Row>
        <Row>
          <Table striped="columns" bordered hover>
            <colgroup>
              <col width="10%" />
              <col width="10%" />
              <col width="70%" />
              <col width="10%" />
            </colgroup>
            <thead>
              <tr>
                <th>id</th>
                <th>title</th>
                <th>content</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>2</td>
                <td>e</td>
              </tr>
            </tbody>
          </Table>
        </Row>
      </Container>
    </>
  );
}
