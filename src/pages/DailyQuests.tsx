import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import Header from '../common/Header';
import DailyQuestsContainer from '../features/daily-quests/ui/DailyQuestsContainer';
import { Suspense } from 'react';
import SkeletonLoader from '../common/SkeletonLoader';
import useModal from '../hooks/useModal';
import DailyQuestsForm from '../features/daily-quests/ui/DailyQuestsForm';

export default function DailyQuests() {
  const { isShow, closeModal, openModal, Modal } = useModal();

  return (
    <>
      <Modal isShow={isShow} title="일퀘 생성" closeModal={closeModal}>
        <DailyQuestsForm closeModal={closeModal} />
      </Modal>
      <Header />
      <Container>
        <Row className="justify-content-end mt-3 mb-2">
          <Col xs="auto">
            <Button type="button" onClick={openModal}>
              + 일퀘 추가
            </Button>
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
              <Suspense
                fallback={<SkeletonLoader columnsCount={5} rowsCount={4} />}
              >
                <DailyQuestsContainer />
              </Suspense>
            </tbody>
          </Table>
        </Row>
      </Container>
    </>
  );
}
