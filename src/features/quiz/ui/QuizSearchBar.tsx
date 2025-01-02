import { Col, Form } from 'react-bootstrap';
import partsQueries from '../../part/queries';
import { QuizFilters } from '../types';
import sectionsQueries from '../../section/queries';
interface QuizSearchBarProps {
  setFilters: (filter: QuizFilters) => void;
  filters: QuizFilters;
}

export default function QuizSearchBar({
  setFilters,
  filters,
}: QuizSearchBarProps) {
  const { data: parts } = partsQueries.getParts();
  const { data: sections } = sectionsQueries.getSections();

  return (
    <>
      <Col xs="auto">
        <Form.Select
          aria-label="Default select example"
          className="mx-1"
          defaultValue={filters.sectionId}
          onChange={e => {
            setFilters({ sectionId: Number(e.target.value) });
          }}
        >
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
          defaultValue={filters.partId}
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
