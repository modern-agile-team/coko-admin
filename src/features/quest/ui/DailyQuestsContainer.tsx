import { Button, ButtonGroup } from 'react-bootstrap';
import useQuestsQuery from '../queries';
import useModal from '../../../hooks/useModal';
import DailyQuestsForm from './DailyQuestsForm';

export default function DailyQuestsContainer() {
  const { isShow, closeModal, Modal } = useModal();
  const { data: dailyQuests } = useQuestsQuery.getDailyQuests();
  const { mutate: deleteDailyQuest } = useQuestsQuery.deleteDailyQuest();

  const handleDelete = (id: number) => {
    if (confirm('삭제할까요?')) {
      deleteDailyQuest({ id });
    }
  };

  return (
    <>
      <Modal isShow={isShow} title="일퀘 수정" closeModal={closeModal}>
        <DailyQuestsForm closeModal={closeModal} />
      </Modal>
      {dailyQuests.map(dailyQuest => (
        <tr key={dailyQuest.id}>
          <td>{dailyQuest.id}</td>
          <td>{dailyQuest.content}</td>
          <td>{dailyQuest.point}</td>
          <td>{dailyQuest.experience}</td>
          <td className="d-flex justify-content-between">
            <ButtonGroup size="sm" className="w-100" aria-label="Basic example">
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
