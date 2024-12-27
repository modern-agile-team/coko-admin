import { Button, FloatingLabel, Form } from 'react-bootstrap';
import useQuizStore from '../../../store/useQuizStore';

import partsQueries from '../../part/queries';
import { Quiz } from '../types';
import getFormDataValue from '../../../utils/getFormDataValues';
import { category } from '../constants';
interface QuizFormProps {
  prevQuiz?: Partial<Quiz>;
}
export function QuizForm({ prevQuiz }: QuizFormProps) {
  const { quiz, pushQuiz } = useQuizStore();
  const { data: parts } = partsQueries.read();

  const handleMutate = (formData: FormData) => {
    const [partId, category, title, question, answer, answerChoice] =
      getFormDataValue(formData, [
        'partId',
        'category',
        'title',
        'question',
        'answer',
        'answerChoice',
      ]);
    console.log(partId, category, title, question, answer, answerChoice);
  };
  return (
    <Form action={handleMutate}>
      <Form.Group className="d-flex justify-content-between">
        <Form.Select
          id="partId"
          className="mx-2"
          value={prevQuiz?.partId}
          name="partId"
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
          name="category"
        >
          <option>문제 유형 선택</option>
          {category.map(item => (
            <option key={item} value={item}>
              {item}
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
            name="title"
            defaultValue={prevQuiz?.title}
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
            name="question"
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
            name="answer"
            size="sm"
            type="text"
            style={{ height: '150px' }}
            defaultValue={prevQuiz?.answer}
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
              name="answerChoice"
              defaultValue={prevQuiz?.answerChoice}
              style={{ height: '150px' }}
            />
          </FloatingLabel>
        )}
      </Form.Group>
      <div className="d-flex justify-content-end">
        <Button type="submit" className="m-3">
          확인
        </Button>
      </div>
    </Form>
  );
}
