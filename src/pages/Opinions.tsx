import Header from '@/common/Header';
import { useOpinionsQuery } from '@/features/opinions/queries';
import useModal from '@/hooks/useModal';
import { useState } from 'react';
import { Button, ButtonGroup, Container, Row, Table } from 'react-bootstrap';

export default function Opinions() {
  const { data: opinions } = useOpinionsQuery.getOpinionsList();
  const { Modal, isShow, openModal, closeModal } = useModal();
  const [content, setContent] = useState('');
  const { mutate: deleteOpinion } = useOpinionsQuery.deleteOpinion();

  const handleOnClick = (content: string) => {
    setContent(content);
    openModal();
  };

  return (
    <>
      <Modal isShow={isShow} title="자세히 보기" closeModal={closeModal}>
        <p>{content}</p>
      </Modal>
      <Header />
      <Container>
        <Row>
          <Table striped="columns" bordered hover>
            <colgroup>
              <col width="10%" />
              <col width="60%" />
              <col width="10%" />
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
              {opinions?.map(opinion => (
                <tr
                  key={opinion.id}
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleOnClick(opinion.content)}
                >
                  <td>{opinion.id}</td>
                  <td>{opinion.title}</td>
                  <td
                    className="text-truncate"
                    style={{
                      maxWidth: '200px',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {opinion.content}
                  </td>
                  <td className="d-flex justify-content-between">
                    <ButtonGroup
                      size="sm"
                      className="w-100"
                      aria-label="Basic example"
                    >
                      <Button
                        variant="secondary"
                        onClick={e => {
                          e.stopPropagation();
                          if (confirm('삭제 하시겠습니까?')) {
                            deleteOpinion({ id: opinion.id });
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
