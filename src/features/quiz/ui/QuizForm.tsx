import { FloatingLabel, Form } from 'react-bootstrap';
import useQuizStore from '../../../store/useQuizStore';
import Quiz from '../../../types/Quiz';
import partQueries from '../../../queries/parts';

interface QuizFormProps {
  prevQuiz?: Partial<Quiz>;
}
export function QuizForm({ prevQuiz }: QuizFormProps) {
  const { quiz, pushQuiz } = useQuizStore();
  const { data: parts } = partQueries.read();
  const category = [
    'COMBINATION',
    'MULTIPLE_CHOICE',
    'OX_SELECTOR',
    'SHORT_ANSWER',
  ];
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
          onChange={e =>
            pushQuiz(
              e.target.id as 'category',
              e.target.value as Quiz['category']
            )
          }
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
            defaultValue={prevQuiz?.title}
            onChange={e => pushQuiz(e.target.id as 'title', e.target.value)}
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
            onChange={e => pushQuiz(e.target.id as 'question', e.target.value)}
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
              pushQuiz(e.target.id as 'answer', e.target.value.split(','))
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
              defaultValue={prevQuiz?.answerChoice}
              style={{ height: '150px' }}
              onChange={e =>
                pushQuiz(
                  e.target.id as 'answerChoice',
                  e.target.value.split(',')
                )
              }
            />
          </FloatingLabel>
        )}
      </Form.Group>
    </Form>
  );
}
