import {
  Button,
  ButtonGroup,
  CloseButton,
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
import { useMutation } from '@tanstack/react-query';
export default function Quiz() {
  const { data: quizzes } = quizApis.get();
  const { data: parts } = partApis.get();
  const { data: sections } = sectionApis.get();
  const { mutate } = useMutation({
    mutationFn: quizApis.create,
    onSuccess: () => {
      console.log('성송');
    },
  });
  const { isShow, closeModal, openModal, Modal } = useModal();
  const { quiz, resetQuiz } = useQuizStore();
  return (
    <>
      <Modal
        isShow={isShow}
        closeModal={closeModal}
        title="퀴즈 생성"
        closeEvent={resetQuiz}
        submitEvnet={() => {
          mutate(quiz);
          resetQuiz();
        }}
      >
        <QuizForm sections={sections ?? []} parts={parts ?? []} />
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
            <Button type="button" onClick={openModal}>
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
                      <Button variant="secondary">수정</Button>
                      <Button variant="secondary">삭제</Button>
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
