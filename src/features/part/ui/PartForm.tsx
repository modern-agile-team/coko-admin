import { FloatingLabel, Form } from 'react-bootstrap';
import sectionApis from '../../../apis/section';
import usePartStore from '../../../store/usePartStore';

export default function PartForm() {
  const { data: sections } = sectionApis.read();
  const { part, pushPart } = usePartStore();
  return (
    <>
      <Form.Select
        id="sectionId"
        className="mb-3"
        onChange={e => {
          pushPart(e.target.id as 'sectionId', Number(e.target.value));
        }}
      >
        <option>섹션 선택</option>
        {sections?.map(section => (
          <option key={section.id} value={section.id}>
            {section.name}
          </option>
        ))}
      </Form.Select>
      <FloatingLabel label="파트 입력">
        <Form.Control
          id="name"
          size="sm"
          type="text"
          defaultValue={part.name}
          onChange={e => {
            pushPart(e.target.id as 'name', e.target.value);
          }}
        />
      </FloatingLabel>
    </>
  );
}
