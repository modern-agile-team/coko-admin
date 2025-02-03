import { FormEventHandler } from 'react';
import { Button, Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import { parseDailyQuestData } from '../utils';
import useDailyQuestsQuery from '../queries';
interface DailyQuestsFormProps {
  closeModal: () => void;
}

export default function DailyQuestsForm({ closeModal }: DailyQuestsFormProps) {
  const { mutate: createDailyQuest } = useDailyQuestsQuery.createDailyQuest();

  const handleMutate: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const DailyQuestData = Object.fromEntries(formData.entries());
    const parsedDailyQuestData = parseDailyQuestData(DailyQuestData);
    createDailyQuest(parsedDailyQuestData, {
      onSuccess: () => {
        closeModal();
      },
    });
  };

  return (
    <Form onSubmit={handleMutate}>
      <Row className="mb-3">
        <Col>
          <FloatingLabel label="제목">
            <Form.Control size="sm" type="text" name="title" className="mb-3" />
          </FloatingLabel>
          <FloatingLabel label="콘텐츠">
            <Form.Control size="sm" type="text" name="content" />
          </FloatingLabel>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <FloatingLabel label="포인트">
            <Form.Control size="sm" type="text" name="point" />
          </FloatingLabel>
        </Col>
        <Col>
          <FloatingLabel label="획득 경험치">
            <Form.Control size="sm" type="text" name="experience" />
          </FloatingLabel>
        </Col>
        <Col>
          <FloatingLabel label="컨디션">
            <Form.Control size="sm" type="text" name="condition" />
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
