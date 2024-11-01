import { create } from 'zustand';
import Quiz from '../types/Quiz';
interface UseQuizState {
  quiz: Partial<Quiz>;
  pushQuiz: <K extends keyof Quiz>(id: K, value: Quiz[K]) => void;
  setQuiz: (quiz: Quiz) => void;
  resetQuiz: () => void;
}
const useQuizStore = create<UseQuizState>(set => ({
  quiz: {
    partId: undefined,
    title: undefined,
    question: undefined,
    answer: [],
    category: undefined,
    answerChoice: [],
  },
  pushQuiz: (id, value) =>
    set(state => ({ quiz: { ...state.quiz, [id]: value } })),
  setQuiz: quiz => set(() => ({ quiz })),
  resetQuiz: () =>
    set(() => ({
      quiz: {
        partId: undefined,
        title: undefined,
        question: undefined,
        answer: [],
        category: undefined,
        answerChoice: [],
      },
    })),
}));
export default useQuizStore;
