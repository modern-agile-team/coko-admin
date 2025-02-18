import { Quiz } from '@/features/quiz/types';
import { Category } from 'aws-sdk/clients/cloudformation';

export const CATEGORY: { label: string; value: Category }[] = [
  { label: '조합형', value: 'COMBINATION' },
  { label: '객관식', value: 'MULTIPLE_CHOICE' },
  { label: 'OX문제', value: 'OX_SELECTOR' },
  { label: '단답형', value: 'SHORT_ANSWER' },
];

export const VAILD_CATEGORIES: Category[] = ['COMBINATION', 'MULTIPLE_CHOICE'];
