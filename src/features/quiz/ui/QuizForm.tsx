import { FloatingLabel, Form } from 'react-bootstrap';
import useQuizStore from '../../../store/useQuizStore';
import Quiz from '../../../types/Quiz';
import partApis from '../../../apis/part';
interface QuizFormProps {
  prevQuiz?: Partial<Quiz>;
}
export function QuizForm({ prevQuiz }: QuizFormProps) {
  const { quiz, pushQuiz } = useQuizStore();
  const { data: parts } = partApis.get();
  const categorys = [
    'COMBINATION',
    'MULTIPLE_CHOICE',
    'OX_SELECTOR',
    'SHORT_ANSWER',
  ];
  console.log(quiz);
  return (
    <Form>
      <Form.Group className="d-flex justify-content-between">
        <Form.Select
          id="partId"
          className="mx-2"
          value={prevQuiz?.partId}
          onChange={e =>
            pushQuiz(e.target.id as 'partId', Number(e.target.value))
          }
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
          onChange={e => pushQuiz(e.target.id as keyof Quiz, e.target.value)}
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
            onChange={e => pushQuiz(e.target.id as keyof Quiz, e.target.value)}
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
            onChange={e => pushQuiz(e.target.id as keyof Quiz, e.target.value)}
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
            onChange={e =>
              pushQuiz(e.target.id as keyof Quiz, e.target.value.split(','))
            }
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
              defaultValue={quiz?.answer}
              style={{ height: '150px' }}
              onChange={e =>
                pushQuiz(e.target.id as keyof Quiz, e.target.value.split(','))
              }
            />
          </FloatingLabel>
        )}
      </Form.Group>
    </Form>
  );
}
