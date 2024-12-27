import { Category, Quiz } from '../types';
import checkIfNumber from './checkIfNumber';
import checkRequiredField from './checkRequiredField';

const getQuizFormDataValues = (
  formData: FormData
): Omit<Quiz, 'id' | 'sectionId'> => {
  const quiz = Object.fromEntries(formData.entries());

  // 필드가 없는 경우 에러를 던짐
  const title = quiz.title?.toString();
  checkRequiredField(title, 'title');

  const category = quiz.category as Category;
  checkRequiredField(category, 'category');

  const partId = Number(quiz.partId);
  checkIfNumber(partId, 'part');
  const answer = quiz.answer?.toString();
  checkRequiredField(answer, 'answer');
  const answerArray = answer.split(',');

  const question = quiz.question?.toString();
  checkRequiredField(question, 'question');

  const answerChoice = quiz.answerChoice?.toString();
  const answerChoiceArray = answerChoice ? answerChoice.split(',') : [];

  return {
    answer: answerArray,
    answerChoice: answerChoiceArray,
    category,
    partId,
    question,
    title,
  };
};

export default getQuizFormDataValues;
