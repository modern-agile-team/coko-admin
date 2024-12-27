import Section from '../../types/Section';
import { Part } from '../part/types';

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

export interface Quizfilters {
  sectionId?: number;
  partId?: number;
}

export type Mod = 'create' | 'update';
