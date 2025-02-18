import { Quiz } from '@/features/quiz/types';

export const CATEGORY: { label: string; value: Quiz['category'] }[] = [
  { label: '조합형', value: 'COMBINATION' },
  { label: '객관식', value: 'MULTIPLE_CHOICE' },
  { label: 'OX문제', value: 'OX_SELECTOR' },
  { label: '단답형', value: 'SHORT_ANSWER' },
];

export const validCategories = ['COMBINATION', 'MULTIPLE_CHOICE'];
