import { create } from 'zustand';
import Part from '../types/Part';
interface UsePartState {
  part: Partial<Part>;
  pushPart: <K extends keyof Part>(id: K, value: Part[K]) => void;
  setPart: (part: Part) => void;
  resetPart: () => void;
}
const usePartStore = create<UsePartState>(set => ({
  part: { sectionId: undefined, name: undefined },
  pushPart: (id, value) =>
    set(state => ({ part: { ...state.part, [id]: value } })),
  setPart: part => set(() => ({ part })),
  resetPart: () =>
    set(() => ({ part: { sectionId: undefined, name: undefined } })),
}));
export default usePartStore;
