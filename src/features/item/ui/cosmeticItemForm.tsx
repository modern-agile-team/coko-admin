import { FloatingLabel, Form } from 'react-bootstrap';

export default function ItemForm() {
  return (
    <Form>
      <FloatingLabel label="아이템 이름" className="mx-2 mt-2">
        <Form.Control type="text"></Form.Control>
      </FloatingLabel>

      <FloatingLabel label="아이템 가격" className="mx-2 mt-2">
        <Form.Control type="text"></Form.Control>
      </FloatingLabel>

      <Form.Control type="file" className="mx-2 mt-2 pd-0"></Form.Control>
    </Form>
  );
}
