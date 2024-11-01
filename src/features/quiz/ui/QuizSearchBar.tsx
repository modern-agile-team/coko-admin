import { Col, Form } from 'react-bootstrap';
import partApis from '../../../apis/part';
import sectionApis from '../../../apis/section';
interface QuizSaerchBarProps {
  setquerys: (query: Record<string, any>) => void;
}
export default function QuizSearchBar({ setquerys }: QuizSaerchBarProps) {
  const { data: parts } = partApis.get();
  const { data: sections } = sectionApis.read();
  return (
    <>
      <Col xs="auto">
        <Form.Select
          aria-label="Default select example"
          className="mx-1"
          onChange={e => {
            e.target.value
              ? setquerys({ sectionId: e.target.value })
              : setquerys({});
          }}
        >
          <option value={''}>섹션</option>
          {sections?.map(section => (
            <option key={section.id} value={section.id}>
              {section.name}
            </option>
          ))}
        </Form.Select>
      </Col>
      <Col xs="auto">
        <Form.Select
          aria-label="Default select example"
          className="mx-1"
          onChange={e => {
            e.target.value === undefined
              ? setquerys({ part: e.target.value })
              : setquerys({});
          }}
        >
          <option value={''}>파트</option>
          {parts?.map(part => (
            <option key={part.id} value={part.id}>
              {part.name}
            </option>
          ))}
        </Form.Select>
      </Col>
    </>
  );
}
