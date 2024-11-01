import { create } from 'zustand';
import Section from '../types/Section';
interface UseSectionState {
  section: Partial<Section>;
  pushSection: <K extends keyof Section>(id: K, value: Section[K]) => void;
  setSection: (section: Section) => void;
  resetSection: () => void;
}
const useSectionStore = create<UseSectionState>(set => ({
  section: { name: undefined },
  pushSection: (id, value) =>
    set(state => ({ section: { ...state.section, [id]: value } })),
  setSection: section => set(() => ({ section })),
  resetSection: () =>
    set(() => ({ section: { id: undefined, name: undefined } })),
}));
export default useSectionStore;
