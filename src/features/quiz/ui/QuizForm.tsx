import { FloatingLabel, Form } from 'react-bootstrap';
import useQuizStore from '../../../store/useQuizStore';
import Quiz from '../../../types/Quiz';
import Section from '../../../types/Section';
import Part from '../../../types/Part';
interface QuizForm {
  sections: Section[];
  parts: Part[];
  prevQuiz?: Quiz;
}
export function QuizForm({ sections, parts, prevQuiz }: QuizForm) {
  const { quiz, setQuiz } = useQuizStore();
  const categorys = [
    'COMBINATION',
    'MULTIPLE_CHOICE',
    'OX_SELECTOR',
    'SHORT_ANSWER',
  ];
  return (
    <Form>
      <Form.Group className="d-flex justify-content-between">
        <Form.Select
          id="sectionId"
          className="mx-2"
          value={prevQuiz?.sectionId}
          onChange={e => setQuiz(e.target.id as keyof Quiz, e.target.value)}
        >
          <option>섹션 선택</option>
          {sections?.map(section => (
            <option key={section.id} value={section.id}>
              {section.name}
            </option>
          ))}
        </Form.Select>

        <Form.Select
          id="part"
          className="mx-2"
          value={prevQuiz?.part}
          onChange={e => setQuiz(e.target.id as keyof Quiz, e.target.value)}
        >
          <option>파트 선택</option>
          {parts?.map(part => (
            <option key={part.id} value={part.id}>
              {part.name}
            </option>
          ))}
        </Form.Select>
        <Form.Select
          className="mx-2"
          id="category"
          value={prevQuiz?.category}
          onChange={e => setQuiz(e.target.id as keyof Quiz, e.target.value)}
        >
          <option>문제 유형 선택</option>
          {categorys.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3 mt-4">
        <FloatingLabel label="타이틀" className="mx-2">
          <Form.Control
            id="title"
            size="sm"
            type="text"
            defaultValue={prevQuiz?.title}
            onChange={e => setQuiz(e.target.id as keyof Quiz, e.target.value)}
          />
        </FloatingLabel>
        <FloatingLabel
          label="문제 (조합형의 경우 빈칸은 #empty# / ex : #empty# a = 10)"
          className="mx-2 mt-4"
        >
          <Form.Control
            id="question"
            as="textarea"
            style={{ height: '170px' }}
            defaultValue={prevQuiz?.question}
            onChange={e => setQuiz(e.target.id as keyof Quiz, e.target.value)}
          />
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
            defaultValue={prevQuiz?.answer}
            onChange={e => setQuiz(e.target.id as keyof Quiz, e.target.value)}
          />
        </FloatingLabel>
        {(quiz?.category === 'COMBINATION' ||
          quiz?.category === 'MULTIPLE_CHOICE') && (
          <FloatingLabel label="보기" className="mx-2 mt-4 w-50">
            <Form.Control
              id="answerChoice"
              size="sm"
              type="text"
              as="textarea"
              defaultValue={prevQuiz?.answerChoice || quiz?.answer}
              style={{ height: '150px' }}
              onChange={e => setQuiz(e.target.id as keyof Quiz, e.target.value)}
            />
          </FloatingLabel>
        )}
      </Form.Group>
    </Form>
  );
}
