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
import { useState } from 'react';
import QuizSearchBar from '../features/quiz/ui/QuizSearchBar';
import quizzesQueries from '../features/quiz/queries';
import type { Mod, Quiz, QuizFilters } from '../features/quiz/types';
import SkeletonLoader from '../common/SkeletonLoader';
import Header from '../common/Header';

export default function Quiz() {
  const [quizFilters, setQuizFilters] = useState<QuizFilters>({
    partId: 0,
    sectionId: 0,
  });

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [mod, setMod] = useState<Mod>('create');

  const { isShow, closeModal, openModal, Modal } = useModal();

  const { data: quizzes, isLoading } = quizzesQueries.getQuizzes(quizFilters);
  const deleteMutation = quizzesQueries.deleteQuiz();

  return (
    <>
      <Header />
      <Modal
        isShow={isShow}
        title="퀴즈 생성"
        closeModal={closeModal}
        closeEvent={() => {
          setQuiz(null);
        }}
      >
        <QuizForm prevQuiz={quiz} closeModal={closeModal} mod={mod} />
      </Modal>

      <Container>
        <Row className="justify-content-end mt-3 mb-2">
          <QuizSearchBar
            setQuizFilters={setQuizFilters}
            quizFilters={quizFilters}
          />
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
            <colgroup>
              <col width="10%" />
              <col width="10%" />
              <col width="70%" />
              <col width="10%" />
            </colgroup>
            <thead>
              <tr>
                <th>id</th>
                <th>partId</th>
                <th>question</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <SkeletonLoader columnsCount={4} rowsCount={3} />
              ) : (
                quizzes?.map(quiz => (
                  <tr key={quiz.id}>
                    <td>{quiz.id}</td>
                    <td>{quiz.partId}</td>
                    <td>{quiz.question}</td>
                    <td className="d-flex justify-content-between">
                      <ButtonGroup
                        size="sm"
                        className="w-100"
                        aria-label="Basic example"
                      >
                        <Button
                          variant="secondary"
                          onClick={() => {
                            setMod('update');
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
                ))
              )}
            </tbody>
          </Table>
        </Row>
      </Container>
    </>
  );
}
