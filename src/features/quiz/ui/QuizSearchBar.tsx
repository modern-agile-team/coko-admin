import { Col, Form } from 'react-bootstrap';
import partQueries from '../../../queries/parts';
import sectionsQueries from '../../../queries/sections';
interface QuizSaerchBarProps {
  setquerys: (query: Record<string, any>) => void;
}
export default function QuizSearchBar({ setquerys }: QuizSaerchBarProps) {
  const { data: parts } = partQueries.read();
  const { data: sections } = sectionsQueries.read();
  return (
    <>
      <Col xs="auto">
        <Form.Select
          aria-label="Default select example"
          className="mx-1"
          onChange={e => {
            e.target.value
              ? setquerys((prev: Record<string, number>) => ({
                  ...prev,
                  sectionId: e.target.value,
                }))
              : setquerys((prev: Record<string, number>) => {
                  const { sectionId, ...rest } = prev;
                  return rest;
                });
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
            e.target.value
              ? setquerys((prev: Record<string, number>) => ({
                  ...prev,
                  partId: e.target.value,
                }))
              : setquerys((prev: Record<string, number>) => {
                  const { partId, ...rest } = prev;
                  return rest;
                });
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
