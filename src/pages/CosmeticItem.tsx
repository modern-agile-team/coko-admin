import useModal from '@/hooks/useModal';
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap';
import Header from '@/common/Header';
import { Suspense, useState } from 'react';
import type { CosmeticItem, CosmeticItemQuery } from '@/features/item/types';
import CosmeticItemContainer from '@/features/item/ui/CosmeticItemContainer';
import SkeletonLoader from '@/common/SkeletonLoader';
import CosmeticItemForm from '@/features/item/ui/CosmeticItemForm';
import { MAIN_CATEGORY, SUB_CATEGORY } from '@/features/item/constants';

export default function CosmeticItem() {
  const { Modal, closeModal, isShow, openModal } = useModal();

  const [cosmeticItem, setCosmeticItem] = useState<CosmeticItem | undefined>();
  const [query, setQuery] = useState<CosmeticItemQuery>();

  const handleEdit = (cosmeticItem: CosmeticItem) => {
    setCosmeticItem(cosmeticItem);
    openModal();
  };

  const handleOpen = () => {
    openModal();
    setCosmeticItem(undefined);
  };

  const handleSelect: React.ChangeEventHandler<HTMLSelectElement> = e => {
    const queryId = Number(e.currentTarget.value) || 0;
    if (e.currentTarget.name === 'mainCategory_id') {
      setQuery(prev => ({ ...prev, mainCategoryId: queryId }));
      return;
    }
    setQuery(prev => ({ ...prev, subCategoryId: queryId }));
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
            <Form.Select
              className="mx-2 mt-2 form-select-sm"
              name="mainCategory_id"
              defaultValue={cosmeticItem?.mainCategoryId}
              onChange={handleSelect}
            >
              <option>메인 카테고리 선택</option>
              {MAIN_CATEGORY.map(category => (
                <option value={category.id} key={category.id}>
                  {category.label}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col xs="auto">
            <Form.Select
              className="mx-2 mt-2 form-select-sm"
              name="subCategory_id"
              defaultValue={cosmeticItem?.subCategoryId}
              onChange={handleSelect}
            >
              <option>서브 카테고리 선택</option>
              {SUB_CATEGORY.map(category => (
                <option value={category.id} key={category.id}>
                  {category.label}
                </option>
              ))}
            </Form.Select>
          </Col>
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
                <CosmeticItemContainer handleEdit={handleEdit} query={query} />
              </Suspense>
            </tbody>
          </Table>
        </Row>
      </Container>
    </>
  );
}
