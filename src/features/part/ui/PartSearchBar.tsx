import { Col, Form } from 'react-bootstrap';
import sectionsQueries from '../../section/queries';
import { PartFilter } from '../types';

interface PartSearchBarProps {
  setFilters: (filter: PartFilter) => void;
}
export default function PartSearchBar({ setFilters }: PartSearchBarProps) {
  const { data: sections } = sectionsQueries.getSections();

  return (
    <>
      <Col xs="auto">
        <Form.Select
          aria-label="Default select example"
          className="mx-1"
          onChange={e => {
            setFilters({ sectionId: Number(e.target.value) });
          }}
        >
          <option value={0}>섹션 선택</option>
          {sections?.map(section => (
            <option key={section.id} value={section.id}>
              {section.name}
            </option>
          ))}
        </Form.Select>
      </Col>
    </>
  );
}
