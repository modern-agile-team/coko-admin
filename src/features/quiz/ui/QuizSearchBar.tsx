import { Col, Form } from 'react-bootstrap';
import partsQueries from '../../part/queries';
import { QuizFilters } from '../types';
import sectionsQueries from '../../section/queries';
interface QuizSearchBarProps {
  setFilters: (filter: QuizFilters) => void;
}

export default function QuizSearchBar({ setFilters }: QuizSearchBarProps) {
  const { data: parts } = partsQueries.getParts({ sectionId: 0 });
  const { data: sections } = sectionsQueries.getSections();

  return (
    <>
      <Col xs="auto">
        <Form.Select aria-label="Default select example" className="mx-1">
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
            setFilters({ partId: Number(e.target.value) });
          }}
        >
          <option value="0">파트</option>
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
