import { Alert, Button, FloatingLabel, Form, Row } from 'react-bootstrap';
import partsQueries from '../queries';
import { parsePartData } from '../service/getPartFormData';
import { useState } from 'react';
import sectionsQueries from '../../section/queries';

interface PartFormProps {
  closeModal: () => void;
}
export default function PartForm({ closeModal }: PartFormProps) {
  const { data: sections } = sectionsQueries.read();
  const { mutate: createPart } = partsQueries.create();
  const [errorMessage, setErrorMessage] = useState('');
  const handleMutate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const partData = Object.fromEntries(formData.entries());
    const parsedPartData = parsePartData(partData);
    createPart(parsedPartData, {
      onSuccess: () => {
        closeModal();
      },
      onError: error => {
        setErrorMessage(error.message);
      },
    });
  };

  return (
    <>
      <Form onSubmit={handleMutate}>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
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
          <Button type="submit" className="m-3">
            확인
          </Button>
        </div>
      </Form>
    </>
  );
}
