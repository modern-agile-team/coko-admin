import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Form,
  Row,
  Table,
} from 'react-bootstrap';
import type Quiz from '../types/Quiz';
import useModal from '../hooks/useModal';
import quizApis from '../apis/quiz';
import partApis from '../apis/part';
import sectionApis from '../apis/section';
import { QuizForm } from '../features/quiz/ui/QuizForm';
import useQuizStore from '../store/useQuizStore';
import { useState } from 'react';
export default function Quiz() {
  const { data: quizzes } = quizApis.read();
  const { data: parts } = partApis.get();
  const { data: sections } = sectionApis.read();
  const createMutation = quizApis.create();
  const updateMutation = quizApis.update();
  const deleteMutation = quizApis.delete();
  const [mod, setMod] = useState<'create' | 'update'>();
  const { isShow, closeModal, openModal, Modal } = useModal();
  const { quiz, resetQuiz, setQuiz } = useQuizStore();

  return (
    <>
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
          <Col xs="auto">
            <Form.Select aria-label="Default select example" className="mx-1">
              <option>섹션</option>
              {sections?.map(section => (
                <option key={section.id} value={section.id}>
                  {section.name}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col xs="auto">
            <Form.Select aria-label="Default select example" className="mx-1">
              <option>파트</option>
              {parts?.map(part => (
                <option key={part.id} value={part.id}>
                  {part.name}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="검색안됩니다"
              className=" mr-sm-2"
            />
          </Col>
          <Col xs="auto">
            <Button type="button">검색</Button>
          </Col>
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
                <th>sectionID</th>
                <th>part</th>
                <th>question</th>
              </tr>
            </thead>
            <tbody>
              {quizzes?.map(quiz => (
                <tr key={quiz.id}>
                  <td>{quiz.id}</td>
                  <td>{quiz.sectionId}</td>
                  <td>{quiz.part}</td>
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
                            sectionId: quiz.sectionId,
                            part: quiz.part,
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
