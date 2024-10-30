import { useState } from 'react';
import Modal from '../component/Modal';

const useMoadl = () => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const openModal = () => setIsShow(true);
  const closeModal = () => setIsShow(false);
  return { isShow, openModal, closeModal, Modal };
};
export default useMoadl;
