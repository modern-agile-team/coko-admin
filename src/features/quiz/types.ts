import { Part } from '../part/types';
import { Section } from '../section/types';

export type Category =
  | 'COMBINATION'
  | 'MULTIPLE_CHOICE'
  | 'OX_SELECTOR'
  | 'SHORT_ANSWER';

export interface Quiz {
  id: number;
  partId: Part['id'];
  sectionId: Section['id'];
  title: string;
  question: string;
  answer: string[];
  category: Category;
  answerChoice: string[];
}

export interface QuizFilters {
  sectionId: number;
  partId: number;
}

export type Mod = 'create' | 'update';
