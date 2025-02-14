import useModal from '@/hooks/useModal';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import Header from '@/common/Header';
import { Suspense, useState } from 'react';
import type { CosmeticItem } from '@/features/item/types';
import CosmeticItemConatiner from '@/features/item/ui/CosmeticItemContainer';
import SkeletonLoader from '@/common/SkeletonLoader';
import CosmeticItemForm from '@/features/item/ui/CosmeticItemForm';

export default function CosmeticItem() {
  const { Modal, closeModal, isShow, openModal } = useModal();

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
            <colgroup>
              <col width="20%" />
              <col width="20%" />
              <col width="20%" />
              <col width="30%" />
              <col width="10%" />
            </colgroup>
            <thead>
              <tr>
                <th>id</th>
                <th>name</th>
                <th>cost</th>
                <th>image</th>
              </tr>
            </thead>
            <tbody>
              <Suspense
                fallback={<SkeletonLoader rowsCount={50} columnsCount={5} />}
              >
                <CosmeticItemConatiner handleEdit={handleEdit} />
              </Suspense>
            </tbody>
          </Table>
        </Row>
      </Container>
    </>
  );
}
