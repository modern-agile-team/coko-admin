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
    sectionId: 0,
    title: '',
    question: '',
    answer: [],
    category: 'MULTIPLE_CHOICE',
    answerChoice: [],
  });
  const resetQuizState = () => {
    setQuiz({
      part: '',
      sectionId: 0,
      title: '',
      question: '',
      answer: [],
      category: 'MULTIPLE_CHOICE',
      answerChoice: [],
    });
  };
  const setQuizOptions = <T extends keyof Quiz>(id: string, value: Quiz[T]) => {
    setQuiz(prev => ({ ...prev, [id]: value }));
  };

  return (
    <Modal show={show} size="lg">
      <Modal.Header closeButton onClick={setShow}>
        <Modal.Title>퀴즈 생성</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group
            className="d-flex justify-content-between"
            controlId="exampleForm.ControlInput2"
          >
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

            <Form.Select aria-label="Default select example" className="mx-2">
              <option>문제 유형 선택</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
              <option value="3">Three</option>
            </Form.Select>
          </Form.Group>
          <Form.Group
            className="mb-3 mt-4"
            controlId="exampleForm.ControlTextarea1"
          >
            <FloatingLabel
              controlId="floatingTextarea"
              label="타이틀"
              className="mx-2"
            >
              <Form.Control size="sm" type="text" placeholder="다음 중..." />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingTextarea"
              label="문제"
              className="mx-2 mt-4"
            >
              <Form.Control
                as="textarea"
                style={{ height: '150px' }}
                placeholder="Leave a comment here"
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="d-flex">
            <FloatingLabel
              controlId="floatingTextarea"
              label="정답"
              className="mx-2 mt-4 w-50"
            >
              <Form.Control
                id="answer"
                as="textarea"
                size="sm"
                type="text"
                placeholder="다음 중..."
                style={{ height: '100px' }}
                onChange={e =>
                  setQuizOptions<'answer'>(e.target.id, [e.target.value])
                }
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingTextarea"
              label="보기"
              className="mx-2 mt-4 w-50"
            >
              <Form.Control
                size="sm"
                type="text"
                as="textarea"
                defaultValue={quiz.answer[0]}
                style={{ height: '100px' }}
                placeholder="다음 중..."
              />
            </FloatingLabel>
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
        <Button variant="primary">Save Changes</Button>
      </Modal.Footer>
    </Modal>
  );
}
