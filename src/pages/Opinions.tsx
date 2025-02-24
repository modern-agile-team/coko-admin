import Header from '@/common/Header';
import { useOpinionsQuery } from '@/features/opinions/queries';
import { Container, Row, Table } from 'react-bootstrap';

export default function Opinions() {
  const { data: opinions } = useOpinionsQuery.getOpinionsList();
  console.log(opinions);
  return (
    <>
      <Header />
      <Container>
        <Row>
          <Table striped="columns" bordered hover>
            <colgroup>
              <col width="10%" />
              <col width="60%" />
              <col width="10%" />
              <col width="10%" />
              <col width="10%" />
            </colgroup>
            <thead>
              <tr>
                <th>id</th>
                <th>content</th>
                <th>point</th>
                <th>exp</th>
              </tr>
            </thead>
            <tbody></tbody>
          </Table>
        </Row>
      </Container>
    </>
  );
}
