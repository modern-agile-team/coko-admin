import { create } from 'zustand';
interface ModalState {
  isShow: boolean;
  openModal: () => void;
  closeModal: () => void;
}
const useModal = create<ModalState>(set => ({
  isShow: false,
  openModal: () => set(() => ({ isShow: true })),
  closeModal: () => set(() => ({ isShow: false })),
}));
export default useModal;
