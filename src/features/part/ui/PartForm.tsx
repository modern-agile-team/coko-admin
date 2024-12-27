import { Button, FloatingLabel, Form, Row } from 'react-bootstrap';
import sectionsQueries from '../../../queries/sections';
import partsQueries from '../queries';
import getFormDataValue from '../../../utils/getFormDataValues';

interface PartFormProps {
  closeModal: () => void;
}
export default function PartForm({ closeModal }: PartFormProps) {
  const { data: sections } = sectionsQueries.read();
  const { mutate: createPart } = partsQueries.create();

  const handleMutate = (formData: FormData) => {
    const [sectionId, name] = getFormDataValue(formData, [
      'sectionId',
      'partName',
    ]);

    createPart({ name, sectionId: Number(sectionId) });
  };

  return (
    <>
      <Form action={handleMutate}>
        <Form.Select id="sectionId" className="mb-3" name="sectionId">
          <option>섹션 선택</option>
          {sections?.map(section => (
            <option key={section.id} value={section.id}>
              {section.name}
            </option>
          ))}
        </Form.Select>
        <FloatingLabel label="파트 입력">
          <Form.Control id="partName" size="sm" type="text" name="partName" />
        </FloatingLabel>
        <div className="d-flex justify-content-end">
          <Button type="submit" className="m-3" onClick={closeModal}>
            확인
          </Button>
        </div>
      </Form>
    </>
  );
}
