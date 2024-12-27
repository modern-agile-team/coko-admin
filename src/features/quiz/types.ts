import { Part } from '../part/types';

export interface Quiz {
  id: number;
  partId: Part['id'];
  title: string;
  question: string;
  answer: string[];
  category: 'COMBINATION' | 'MULTIPLE_CHOICE' | 'OX_SELECTOR' | 'SHORT_ANSWER';
  answerChoice: string[];
}

export interface Quizfilters {
  sectionId?: number;
  partId?: number;
}
