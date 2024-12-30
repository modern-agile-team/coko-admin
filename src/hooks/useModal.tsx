import { useState } from 'react';
import Modal from '../common/Modal';

const useModal = () => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const openModal = () => setIsShow(true);
  const closeModal = () => setIsShow(false);
  return { isShow, openModal, closeModal, Modal };
};

export default useModal;
