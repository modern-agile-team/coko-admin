import { Modal, Button, Form, FloatingLabel } from 'react-bootstrap';
import Quiz from '../types/Quiz';
import { useState } from 'react';
interface CreateQuizModal {
  show: boolean;
  setShow: () => void;
}
export default function CreateQuizModal({ show, setShow }: CreateQuizModal) {
  const [quiz, setQuiz] = useState<Quiz>({
    part: '',
    sectionId: null,
    title: '',
    question: '',
    answer: '',
    category: null,
    answerChoice: '',
  });
  const resetQuizState = () => {
    setQuiz({
      part: '',
      sectionId: null,
      title: '',
      question: '',
      answer: '',
      category: null,
      answerChoice: '',
    });
  };
  const setQuizOptions = (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement
    >
  ) => {
    const { id, value } = e.target;

    setQuiz(prev => ({ ...prev, [id]: value }));
  };
  return (
    <Modal show={show} size="lg">
      <Modal.Header>
        <Modal.Title>퀴즈 생성</Modal.Title>
        <Button
          size="lg"
          variant="close"
          onClick={setShow}
          aria-label="Close lg"
        />
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="d-flex justify-content-between">
            <Form.Select aria-label="Default select example" className="mx-2">
              <option>섹션 선택</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>

            <Form.Select aria-label="Default select example" className="mx-2">
              <option>파트 선택</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
            <Form.Select
              aria-label="Default select example"
              className="mx-2"
              id="category"
              onChange={setQuizOptions}
            >
              <option>문제 유형 선택</option>
              <option value="COMBINATION">COMBINATION</option>
              <option value="MULTIPLE_CHOICE">MULTIPLE_CHOICE</option>
              <option value="OX_SELECTOR">OX_SELECTOR</option>
              <option value="SHORT_ANSWER">SHORT_ANSWER</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3 mt-4">
            <FloatingLabel label="타이틀" className="mx-2">
              <Form.Control size="sm" type="text" />
            </FloatingLabel>

            <FloatingLabel
              label="문제 (조합형의 경우 빈칸은 #empty# / ex : #empty# a = 10)"
              className="mx-2 mt-4"
            >
              <Form.Control as="textarea" style={{ height: '170px' }} />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="d-flex">
            <FloatingLabel
              label="정답 (,로 구분해서 작성 / ex : a,b...)"
              className="mx-2 mt-4 w-50"
            >
              <Form.Control
                id="answer"
                as="textarea"
                size="sm"
                type="text"
                style={{ height: '150px' }}
                onChange={setQuizOptions}
              />
            </FloatingLabel>
            {(quiz.category === 'COMBINATION' ||
              quiz.category === 'MULTIPLE_CHOICE') && (
              <FloatingLabel label="보기" className="mx-2 mt-4 w-50">
                <Form.Control
                  size="sm"
                  type="text"
                  as="textarea"
                  defaultValue={quiz.answer}
                  style={{ height: '150px' }}
                />
              </FloatingLabel>
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            setShow();
            resetQuizState();
          }}
        >
          Close
        </Button>
        <Button variant="primary" onClick={() => console.log(quiz)}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
