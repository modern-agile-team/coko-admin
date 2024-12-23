import getFormDataValue from '@/features/item/service/getFormDataValue';
import cosmeticItemQueries from '@/queries/cosmeticItem';
import CosmeticItem from '@/types/CosmeticlItem';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import uploadFile from '@/features/item/service/s3UploadFile';

export default function CosmeticItemForm() {
  const { mutate: createMutation } = cosmeticItemQueries.create();

  const handleMutate = (formData: FormData) => {
    const name = getFormDataValue(formData, 'itemName');
    const cost = getFormDataValue(formData, 'itemPrice');
    const category = getFormDataValue(
      formData,
      'category'
    ) as CosmeticItem['category'];
    const image = formData.get('image') as File;
    uploadFile(image);
    createMutation({ category, cost: Number(cost), image: image.name, name });
  };

  return (
    <>
      <Form action={handleMutate}>
        <FloatingLabel label="아이템 이름" className="mx-2 mt-2">
          <Form.Control type="text" name="itemName" />
        </FloatingLabel>
        <FloatingLabel label="아이템 가격" className="mx-2 mt-2">
          <Form.Control type="text" name="itemPrice" />
        </FloatingLabel>
        <Form.Select className="mx-2 mt-2" name="category">
          <option>카테고리 선택</option>
          <option>카테고리 선택</option>
          <option>카테고리 선택</option>
          <option>카테고리 선택</option>
        </Form.Select>
        <Form.Control
          type="file"
          className="mx-2 mt-2 pd-0"
          name="image"
          accept="image/*"
        />
        <Button type="submit" className="mx-2 mt-2">
          제발이거눌러주세요 제출
        </Button>
      </Form>
    </>
  );
}
