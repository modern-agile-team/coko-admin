import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
  Table,
} from 'react-bootstrap';
import Modal from '../component/Modal';
import useModal from '../store/useModal';
import { useState } from 'react';
import type Quiz from '../types/Quiz';
export default function Quiz() {
  const { openModal } = useModal();
  const [quiz, setQuiz] = useState<Quiz>({
    part: '',
    sectionId: null,
    title: '',
    question: '',
    answer: '',
    category: null,
    answerChoice: '',
  });
  const setQuizOptions = (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement
    >
  ) => {
    const { id, value } = e.target;

    setQuiz(prev => ({ ...prev, [id]: value }));
  };
  return (
    <>
      <Modal title="퀴즈 생성">
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
      </Modal>

      <Container>
        <Row className="justify-content-end mt-3 mb-2">
          <Col xs="auto">
            <Form.Select aria-label="Default select example" className="mx-2">
              <option>섹션</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
              <option value="3">Three</option>
            </Form.Select>
          </Col>
          <Col xs="auto">
            <Form.Select aria-label="Default select example" className="mx-2">
              <option>파트</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
              <option value="3">Three</option>
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
                <th>section</th>
                <th>part</th>
                <th>question</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>variable</td>
                <td>let</td>
                <td>let a...</td>
              </tr>
            </tbody>
          </Table>
        </Row>
      </Container>
    </>
  );
}
