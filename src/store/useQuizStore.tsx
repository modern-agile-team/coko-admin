import { create } from 'zustand';
import Quiz from '../types/Quiz';
interface UseQuizState {
  quiz: Partial<Quiz>;
  setQuiz: <K extends keyof Quiz>(id: K, value: Quiz[K]) => void;
  resetQuiz: () => void;
}
const useQuizStore = create<UseQuizState>(set => ({
  quiz: {},
  setQuiz: (id, value) =>
    set(state => ({ quiz: { ...state.quiz, [id]: value } })),
  resetQuiz: () => set(() => ({ quiz: {} })),
}));
export default useQuizStore;
