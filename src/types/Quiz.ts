import Part from './Part';
import Section from './Section';

export default interface Quiz {
  id?: number;
  part: Part['name'];
  sectionId: Section['id'];
  title: string;
  question: string;
  answer: string[];
  category: 'COMBINATION' | 'MULTIPLE_CHOICE' | 'OX_SELECTOR' | 'SHORT_ANSWER';
  answerChoice: string[];
}
