import { Alert, Button, FloatingLabel, Form } from 'react-bootstrap';
import sectionsQueries from '../queries';
import { FormEventHandler, useState } from 'react';
import { parseSectionData } from '../service/utils';

interface SectionFormProps {
  closeModal: () => void;
}

export default function SectionForm({ closeModal }: SectionFormProps) {
  const { mutate: createMutate } = sectionsQueries.createSection();
  const [errorMessage, setErrorMessage] = useState('');

  const handleMutate: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const sectionData = Object.fromEntries(formData.entries());
    const parsedSectionData = parseSectionData(sectionData);

    createMutate(parsedSectionData, {
      onSuccess: () => {
        closeModal();
      },
      onError: error => {
        setErrorMessage(error.message);
      },
    });
  };

  return (
    <Form onSubmit={handleMutate}>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <FloatingLabel label="섹션 입력" className="mx-2">
        <Form.Control id="name" size="sm" type="text" name="sectionName" />
      </FloatingLabel>
      <div className="d-flex justify-content-end">
        <Button type="submit" className="m-3">
          확인
        </Button>
      </div>
    </Form>
  );
}
