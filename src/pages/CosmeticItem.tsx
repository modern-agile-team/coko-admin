import useModal from '@/hooks/useModal';
import { useCosmeticItemQuery } from '@/features/item/queries';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import Header from '@/common/Header';
import { useState } from 'react';
import CosmeticItemForm from '@/features/item/ui/CosmeticItemForm';
import type { CosmeticItem } from '@/features/item/types';

export default function CosmeticItem() {
  const { Modal, closeModal, isShow, openModal } = useModal();
  const { data: CosmeticItems } = useCosmeticItemQuery.getCosmeticItems();
  const [cosmeticItem, setCosmeticItem] = useState<CosmeticItem | undefined>();

  const handleEdit = (cosmeticItem: CosmeticItem) => {
    setCosmeticItem(cosmeticItem);
    openModal();
  };

  const handleOpen = () => {
    openModal();
    setCosmeticItem(undefined);
  };

  return (
    <>
      <Header />
      <Modal title="아이템 추가" isShow={isShow} closeModal={closeModal}>
        <CosmeticItemForm cosmeticItem={cosmeticItem} closeModal={closeModal} />
      </Modal>
      <Container>
        <Row className="justify-content-end mt-3 mb-2">
          <Col xs="auto">
            <Button type="button" onClick={handleOpen}>
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
                  <td>
                    <Button onClick={() => handleEdit(item)}>수정</Button>
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
