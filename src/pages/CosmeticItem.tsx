import useModal from '@/hooks/useModal';
import cosmeticItemQueries from '@/features/item/queries';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import CosmeticItemForm from '@/features/item/ui/cosmeticItemForm';
import Header from '@/common/Header';

export default function CosmeticItem() {
  const { Modal, closeModal, isShow, openModal } = useModal();
  const { data: CosmeticItems } = cosmeticItemQueries.read();
  return (
    <>
      <Header />
      <Modal title="아이템 추가" isShow={isShow} closeModal={closeModal}>
        <CosmeticItemForm />
      </Modal>
      <Container>
        <Row className="justify-content-end mt-3 mb-2">
          <Col xs="auto">
            <Button type="button" onClick={openModal}>
              + 아이템 추가
            </Button>
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
              {CosmeticItems?.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.image}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Row>
      </Container>
    </>
  );
}
