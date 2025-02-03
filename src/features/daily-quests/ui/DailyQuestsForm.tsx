import { FormEventHandler } from 'react';
import { Button, Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import { parseDailyQuestData } from '../utils';
import useDailyQuestsQuery from '../queries';
import { DailyQuest } from '../types';

interface DailyQuestsFormProps {
  closeModal: () => void;
  dailyQuest?: DailyQuest;
}

export default function DailyQuestsForm({
  closeModal,
  dailyQuest,
}: DailyQuestsFormProps) {
  const { mutate: createDailyQuest } = useDailyQuestsQuery.createDailyQuest();
  const { mutate: updateDailyQuest } = useDailyQuestsQuery.updateDailyQuest();

  const handleMutate: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const DailyQuestData = Object.fromEntries(formData.entries());
    const parsedDailyQuestData = parseDailyQuestData(DailyQuestData);

    if (dailyQuest) {
      updateDailyQuest({ id: dailyQuest.id, dailyQuest });
    } else {
      createDailyQuest(parsedDailyQuestData, {
        onSuccess: () => {
          closeModal();
        },
      });
    }
  };

  return (
    <Form onSubmit={handleMutate}>
      <Row className="mb-3">
        <Col>
          <FloatingLabel label="제목">
            <Form.Control
              size="sm"
              type="text"
              name="title"
              className="mb-3"
              value={dailyQuest?.title}
            />
          </FloatingLabel>
          <FloatingLabel label="콘텐츠">
            <Form.Control
              size="sm"
              type="text"
              name="content"
              value={dailyQuest?.content}
            />
          </FloatingLabel>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <FloatingLabel label="포인트">
            <Form.Control
              size="sm"
              type="text"
              name="point"
              value={dailyQuest?.point}
            />
          </FloatingLabel>
        </Col>
        <Col>
          <FloatingLabel label="획득 경험치">
            <Form.Control
              size="sm"
              type="text"
              name="experience"
              value={dailyQuest?.experience}
            />
          </FloatingLabel>
        </Col>
        <Col>
          <FloatingLabel label="컨디션">
            <Form.Control
              size="sm"
              type="text"
              name="condition"
              value={dailyQuest?.condition}
            />
          </FloatingLabel>
        </Col>
      </Row>

      <div className="d-flex justify-content-end">
        <Button type="submit" className="m-3">
          확인
        </Button>
      </div>
    </Form>
  );
}
