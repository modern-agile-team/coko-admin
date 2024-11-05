import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Row,
  Table,
} from 'react-bootstrap';
import useMoadl from '../hooks/useModal';
import PartForm from '../features/part/ui/PartForm';
import { useState } from 'react';
import usePartStore from '../store/usePartStore';
import type Part from '../types/Part';
import partsQueries from '../queries/parts';
export default function Part() {
  const { isShow, openModal, closeModal, Modal } = useMoadl();
  const [mod, setMod] = useState<'create' | 'update'>();
  const { data: parts } = partsQueries.read();
  const createMutation = partsQueries.create();
  const updateMutation = partsQueries.update();
  const deleteMutation = partsQueries.delete();
  const { part, resetPart, setPart } = usePartStore();
  return (
    <>
      <Modal
        title="파트 추가"
        isShow={isShow}
        closeModal={closeModal}
        submitEvnet={() => {
          switch (mod) {
            case 'create':
              createMutation.mutate(part as Part);
              break;
            case 'update':
              updateMutation.mutate(part as Part);
          }

          resetPart();
        }}
      >
        <PartForm />
      </Modal>

      <Container>
        <Row className="justify-content-end mt-3 mb-2">
          <Col xs="auto">
            <Button
              type="button"
              onClick={() => {
                setMod('create');
                openModal();
              }}
            >
              + 파트 추가
            </Button>
          </Col>
        </Row>
        <Row>
          <Table striped="columns" bordered hover>
            <thead>
              <tr>
                <th>id</th>
                <th>sectionId</th>
                <th>part</th>
              </tr>
            </thead>
            <tbody>
              {parts?.map(part => (
                <tr key={part.id}>
                  <td>{part.id}</td>
                  <td>{part.sectionId}</td>
                  <td>{part.name}</td>
                  <td className="d-flex justify-content-end">
                    <ButtonGroup size="sm" aria-label="Basic example">
                      <Button
                        variant="secondary"
                        onClick={() => {
                          setMod('update');
                          setPart({
                            id: part.id,
                            sectionId: part.sectionId,
                            name: part.name,
                          });
                          openModal();
                        }}
                      >
                        수정
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => {
                          deleteMutation.mutate(part.id);
                          if (confirm('삭제 하시겠습니까?')) {
                          }
                        }}
                      >
                        삭제
                      </Button>
                    </ButtonGroup>
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
