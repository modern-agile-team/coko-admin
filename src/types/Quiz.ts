export default interface Quiz {
  id?: number;
  part: string;
  sectionId: number | null;
  title: string;
  question: string;
  answer: string[] | '';
  category:
    | 'COMBINATION'
    | 'MULTIPLE_CHOICE'
    | 'OX_SELECTOR'
    | 'SHORT_ANSWER'
    | null;
  answerChoice: string[] | '';
}
