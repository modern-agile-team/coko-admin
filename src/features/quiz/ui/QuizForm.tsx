import { Alert, Button, FloatingLabel, Form } from 'react-bootstrap';
import { Category, Mod, Quiz, QuizFilters } from '../types';
import { FormEventHandler, useState } from 'react';
import quizzesQueries from '../queries';
import { CATEGORY, VAILD_CATEGORIES } from './../constants';
import { parseQuizData } from '../service/utils';
import QuizSearchBar from '@/features/quiz/ui/QuizSearchBar';

interface QuizFormProps {
  prevQuiz: Quiz | null;
  closeModal: () => void;
  mod: Mod;
}

export function QuizForm({ prevQuiz, closeModal, mod }: QuizFormProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category>();

  const [quizFilters, setQuizFilters] = useState<QuizFilters>({
    partId: prevQuiz ? prevQuiz.partId : 0,
    sectionId: 0,
  });

  const [errorMessage, setErrorMessage] = useState('');
  const { mutate: createQuiz } = quizzesQueries.createQuiz();
  const { mutate: updateQuiz } = quizzesQueries.updateQuiz();

  const handleMutate: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const quizData = Object.fromEntries(formData.entries());
    const parsedQuizData = parseQuizData(quizData);

    if (mod === 'create') {
      createQuiz(
        { ...parsedQuizData, partId: quizFilters.partId },
        {
          onError: error => {
            setErrorMessage(error.message);
          },
          onSuccess: () => {
            closeModal();
          },
        }
      );
    } else if (mod === 'update' && prevQuiz) {
      updateQuiz(
        {
          id: prevQuiz.id,
          ...parsedQuizData,
          partId: quizFilters.partId,
        },
        {
          onError: error => {
            setErrorMessage(error.message);
          },
          onSuccess: () => {
            closeModal();
          },
        }
      );
    }
  };

  const isChoiceRequired =
    VAILD_CATEGORIES.includes(prevQuiz?.category ?? '') ||
    VAILD_CATEGORIES.includes(selectedCategory ?? '');

  return (
    <Form onSubmit={handleMutate}>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <Form.Group className="d-flex justify-content-between">
        <QuizSearchBar
          quizFilters={quizFilters}
          setQuizFilters={setQuizFilters}
        />
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
          {CATEGORY.map(item => (
            <option key={item.value} value={item.value}>
              {item.label}
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
          label="정답 (,로 구분해서 작성 띄어쓰기 노노/ ex : a,b...)"
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
