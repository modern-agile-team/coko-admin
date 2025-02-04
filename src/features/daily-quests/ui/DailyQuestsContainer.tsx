import { Button, ButtonGroup } from 'react-bootstrap';
import useDailyQuestsQuery from '../queries';
import useModal from '../../../hooks/useModal';
import DailyQuestsForm from './DailyQuestsForm';
import { useState } from 'react';
import { DailyQuest } from '../types';

export default function DailyQuestsContainer() {
  const { isShow, closeModal, openModal, Modal } = useModal();
  const { data: dailyQuests } = useDailyQuestsQuery.getDailyQuests();
  const { mutate: deleteDailyQuest } = useDailyQuestsQuery.deleteDailyQuest();

  const [dailyQuest, setDailyQuest] = useState<DailyQuest>();

  const handleEdit = (dailyQuest: DailyQuest) => {
    openModal();
    setDailyQuest(dailyQuest);
  };

  const handleDelete = (id: number) => {
    if (confirm('삭제할까요?')) {
      deleteDailyQuest({ id });
    }
  };

  return (
    <>
      <Modal isShow={isShow} title="일퀘 수정" closeModal={closeModal}>
        <DailyQuestsForm closeModal={closeModal} dailyQuest={dailyQuest} />
      </Modal>
      {dailyQuests.map(dailyQuest => (
        <tr key={dailyQuest.id}>
          <td>{dailyQuest.id}</td>
          <td>{dailyQuest.title}</td>
          <td>{dailyQuest.content}</td>
          <td className="d-flex justify-content-between">
            <ButtonGroup size="sm" className="w-100" aria-label="Basic example">
              <Button
                variant="secondary"
                onClick={() => handleEdit(dailyQuest)}
              >
                수정
              </Button>
              <Button
                variant="secondary"
                onClick={() => handleDelete(dailyQuest.id)}
              >
                삭제
              </Button>
            </ButtonGroup>
          </td>
        </tr>
      ))}
    </>
  );
}
