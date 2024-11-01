import { FloatingLabel, Form } from 'react-bootstrap';
import useSectionStore from '../../../store/useSectionStore';

export default function SectionForm() {
  const { section, pushSection } = useSectionStore();
  console.log(section);
  return (
    <FloatingLabel label="섹션 입력" className="mx-2">
      <Form.Control
        id="name"
        size="sm"
        type="text"
        defaultValue={section?.name}
        onChange={e => {
          pushSection(e.target.id as 'name', e.target.value);
        }}
      />
    </FloatingLabel>
  );
}
