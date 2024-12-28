import { Category, Quiz } from '../types';

export const isString = (value: FormDataEntryValue): value is string => {
  return typeof value === 'string';
};

export const parseQuizData = (
  formData: Record<string, FormDataEntryValue>
): Omit<Quiz, 'id' | 'sectionId'> => {
  return {
    title: formData.title.toString(),
    category: formData.category as Category,
    partId: Number(formData.partId),
    question: formData.question.toString(),
    answer: isString(formData.answer) ? formData.answer.split(',') : [],
    answerChoice: isString(formData.answerChoice)
      ? formData.answerChoice.split(',')
      : [],
  };
};
