import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Row,
  Table,
} from 'react-bootstrap';
import type Quiz from '../types/Quiz';
import useModal from '../hooks/useModal';
import { QuizForm } from '../features/quiz/ui/QuizForm';
import useQuizStore from '../store/useQuizStore';
import { useState } from 'react';
import QuizSearchBar from '../features/quiz/ui/QuizSearchBar';
import quizzesQueries from '../queries/quizzes';
export default function Quiz() {
  const [querys, setquerys] = useState<{ sectionId?: number; partId?: number }>(
    {}
  );
  const { data: quizzes } = quizzesQueries.read(querys);
  const createMutation = quizzesQueries.create();
  const updateMutation = quizzesQueries.update();
  const deleteMutation = quizzesQueries.delete();
  const [mod, setMod] = useState<'create' | 'update'>();
  const { isShow, closeModal, openModal, Modal } = useModal();
  const { quiz, resetQuiz, setQuiz } = useQuizStore();
  if (!quizzes) {
    return <div>404...</div>;
  }
  return (
    <>
      <h1>테스트888</h1>
      <Modal
        isShow={isShow}
        closeModal={closeModal}
        title="퀴즈 생성"
        closeEvent={resetQuiz}
        submitEvnet={() => {
          switch (mod) {
            case 'create':
              createMutation.mutate(quiz as Quiz);
              break;
            case 'update':
              updateMutation.mutate(quiz as Quiz);
          }

          resetQuiz();
        }}
      >
        <QuizForm prevQuiz={quiz} />
      </Modal>
      <Container>
        <Row className="justify-content-end mt-3 mb-2">
          <QuizSearchBar setquerys={setquerys}></QuizSearchBar>
          <Col xs="auto">
            <Button
              type="button"
              onClick={() => {
                setMod('create');
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
              {quizzes?.map(quiz => (
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
                          setMod('update');
                          setQuiz({
                            id: quiz.id,
                            partId: quiz.partId,
                            title: quiz.title,
                            question: quiz.question,
                            answer: quiz.answer,
                            category: quiz.category,
                            answerChoice: quiz.answerChoice,
                          });
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
