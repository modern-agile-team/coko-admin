import { Button, FloatingLabel, Form } from 'react-bootstrap';
import partsQueries from '../../part/queries';
import { Category, Mod, Quiz } from '../types';
import getFormDataValue from '../../../utils/getFormDataValue';
import { useEffect, useState, useTransition } from 'react';
import quizzesQueries from '../queries';
import { category } from './../constants';
import getQuizFormDataValues from '../service/getQuizFormDataValue';
interface QuizFormProps {
  prevQuiz?: Omit<Quiz, 'sectionId'>;
  closeModal: () => void;
  mod: Mod;
  setQuiz: () => void;
}
export function QuizForm({
  prevQuiz,
  closeModal,
  mod,
  setQuiz,
}: QuizFormProps) {
  const { data: parts } = partsQueries.read();
  const [selectedCategory, setSelectedCategory] = useState<Category>();
  const [error, setError] = useState<string>('');
  const { mutate: createQuiz } = quizzesQueries.create();
  const { mutate: updateQuiz } = quizzesQueries.update();
  useEffect(() => {
    return () => setQuiz();
  }, []);
  const handleMutate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      const quiz = getQuizFormDataValues(formData);
      if (mod === 'create') {
        createQuiz(quiz);
      } else if (mod === 'update' && prevQuiz) {
        updateQuiz({
          id: prevQuiz?.id,
          ...quiz,
        });
      }

      closeModal();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  const validCategories = ['COMBINATION', 'MULTIPLE_CHOICE'];
  const isChoiceRequired =
    validCategories.includes(prevQuiz?.category ?? '') ||
    validCategories.includes(selectedCategory ?? '');
  return (
    <Form onSubmit={handleMutate}>
      {error && <div className="alert alert-danger">{error}</div>}
      <Form.Group className="d-flex justify-content-between">
        <Form.Select
          id="partId"
          className="mx-2"
          defaultValue={prevQuiz?.partId}
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
          defaultValue={prevQuiz?.category}
          name="category"
          onChange={e => {
            setSelectedCategory(e.target.value as Category);
          }}
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
        {isChoiceRequired && (
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
        <Button className="m-3" type="submit">
          확인
        </Button>
      </div>
    </Form>
  );
}
