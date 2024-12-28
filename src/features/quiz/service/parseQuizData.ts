import { Category, Quiz } from '../types';

export const parseQuizData = (
  quiz: Record<string, any>
): Omit<Quiz, 'id' | 'sectionId'> => {
  return {
    title: quiz.title.toString(),
    category: quiz.category as Category,
    partId: Number(quiz.partId),
    question: quiz.question.toString(),
    answer: quiz.answer.split(','),
    answerChoice: quiz.answerChoice ? quiz.answerChoice.split(',') : [],
  };
};
