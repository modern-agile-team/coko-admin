import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Row,
  Table,
} from 'react-bootstrap';
import useModal from '../hooks/useModal';
import { QuizForm } from '../features/quiz/ui/QuizForm';
import useQuizStore from '../store/useQuizStore';
import { useState } from 'react';
import QuizSearchBar from '../features/quiz/ui/QuizSearchBar';
import quizzesQueries from '../features/quiz/queries';
import type { Quiz, Quizfilters } from '../features/quiz/types';
export default function Quiz() {
  const [filters, setFilters] = useState<Quizfilters>({
    partId: 0,
    sectionId: 0,
  });
  const { data: quizzes, isLoading } = quizzesQueries.read(filters);
  const deleteMutation = quizzesQueries.delete();
  const { isShow, closeModal, openModal, Modal } = useModal();
  const [quiz, setQuiz] = useState<Quiz>();
  if (isLoading) {
    return <div>로딩 중...</div>;
  }
  if (!quizzes) {
    return <div>404...</div>;
  }
  return (
    <>
      <Modal isShow={isShow} closeModal={closeModal} title="퀴즈 생성">
        <QuizForm prevQuiz={quiz} />
      </Modal>
      <Container>
        <Row className="justify-content-end mt-3 mb-2">
          <QuizSearchBar setFilters={setFilters}></QuizSearchBar>
          <Col xs="auto">
            <Button
              type="button"
              onClick={() => {
                openModal();
              }}
            >
              + 퀴즈 추가
            </Button>
          </Col>
        </Row>
        <Row>
          <Table striped="columns" bordered hover>
            <thead>
              <tr>
                <th>id</th>
                <th>partId</th>
                <th>question</th>
              </tr>
            </thead>
            <tbody>
              {quizzes.map(quiz => (
                <tr key={quiz.id}>
                  <td>{quiz.id}</td>
                  <td>{quiz.partId}</td>
                  <td>{quiz.question}</td>
                  <td className="d-flex justify-content-between w-100">
                    <ButtonGroup
                      size="sm"
                      className="w-100"
                      aria-label="Basic example"
                    >
                      <Button
                        variant="secondary"
                        onClick={() => {
                          setQuiz(quiz);
                          openModal();
                        }}
                      >
                        수정
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => {
                          if (confirm('삭제 하시겠습니까?')) {
                            deleteMutation.mutate(Number(quiz.id));
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
