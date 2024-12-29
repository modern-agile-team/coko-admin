import { Category, Quiz } from '../types';

export const isString = (value: FormDataEntryValue): value is string => {
  return typeof value === 'string';
};

export const parseQuizData = (
  quizFormData: Record<string, FormDataEntryValue>
): Omit<Quiz, 'id' | 'sectionId'> => {
  return {
    title: quizFormData.title.toString(),
    category: quizFormData.category as Category,
    partId: Number(quizFormData.partId),
    question: quizFormData.question.toString(),
    answer: isString(quizFormData.answer) ? quizFormData.answer.split(',') : [],
    answerChoice: isString(quizFormData.answerChoice)
      ? quizFormData.answerChoice.split(',')
      : [],
  };
};
