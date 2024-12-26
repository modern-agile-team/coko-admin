import { Button, FloatingLabel, Form } from 'react-bootstrap';
import sectionsQueries from '../../../queries/sections';
import getFormDataValue from '../service/getFormData';

export default function PartForm() {
  const { data: sections } = sectionsQueries.read();
  const handleMutate = (formData: FormData) => {
    const sectionId = getFormDataValue(formData, 'sectionId');
    const part = getFormDataValue(formData, 'part');

    console.log(sectionId, part);
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
          <Form.Control
            id="part"
            size="sm"
            type="text"
            name="part"
            onChange={e => {}}
          />
        </FloatingLabel>
        <Button type="submit">asdasds</Button>
      </Form>
    </>
  );
}
