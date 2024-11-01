import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Row,
  Table,
} from 'react-bootstrap';
import useMoadl from '../hooks/useModal';
import sectionApis from '../apis/section';
import SectionForm from '../features/section/ui/SectionForm';
import { useState } from 'react';
import useSectionStore from '../store/useSectionStore';
import type Section from '../types/Section';
export default function Section() {
  const { resetSection, section, setSection } = useSectionStore();
  const { isShow, closeModal, openModal, Modal } = useMoadl();
  const [mod, setMod] = useState<'create' | 'update'>();
  const { data: sections } = sectionApis.read();
  const createMutation = sectionApis.create();
  const updateMutation = sectionApis.update();
  const deleteMutation = sectionApis.delete();
  return (
    <>
      <Modal
        isShow={isShow}
        closeModal={closeModal}
        title="섹션 추가"
        submitEvnet={() => {
          switch (mod) {
            case 'create':
              createMutation.mutate(section as Section);
              break;
            case 'update':
              updateMutation.mutate(section as Section);
          }

          resetSection();
        }}
      >
        <SectionForm />
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
              + 섹션 추가
            </Button>
          </Col>
        </Row>
        <Row>
          <Table striped="columns" bordered hover>
            <thead>
              <tr>
                <th>id</th>
                <th>section</th>
              </tr>
            </thead>
            <tbody>
              {sections?.map(section => (
                <tr key={section.id}>
                  <td>{section.id}</td>
                  <td>{section.name}</td>
                  <td className="d-flex justify-content-end">
                    <ButtonGroup size="sm" aria-label="Basic example">
                      <Button
                        variant="secondary"
                        onClick={() => {
                          setMod('update');
                          setSection({ id: section.id, name: section.name });
                          openModal();
                        }}
                      >
                        수정
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => {
                          deleteMutation.mutate(section.id);
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
