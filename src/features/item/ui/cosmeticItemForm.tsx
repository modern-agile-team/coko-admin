import cosmeticItemQueries from '@/features/item/queries';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import {
  parseCosmeticItemData,
  s3uploadFile,
} from '@/features/item/service/utils';
import { MAIN_CATEGORY, SUB_CATEGORY } from '@/features/item/constants';
import { FormEventHandler } from 'react';

export default function CosmeticItemForm() {
  const { mutate: createMutation } = cosmeticItemQueries.create();

  const handleMutate: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const cosmeticItem = Object.fromEntries(formData.entries());
    const parsedCosmeticItem = parseCosmeticItemData(cosmeticItem);
    const image = formData.get('item_image') as File;
    s3uploadFile(image);
    createMutation({ ...parsedCosmeticItem, image: image.name });
  };

  return (
    <>
      <Form onSubmit={handleMutate}>
        <FloatingLabel label="아이템 이름" className="mx-2 mt-2">
          <Form.Control type="text" name="item_name" />
        </FloatingLabel>
        <FloatingLabel label="아이템 가격" className="mx-2 mt-2">
          <Form.Control type="text" name="item_price" />
        </FloatingLabel>
        <Form.Select className="mx-2 mt-2" name="mainCategory_id">
          <option>메인 카테고리 선택</option>
          {MAIN_CATEGORY.map(category => (
            <option value={category.id} key={category.id}>
              {category.label}
            </option>
          ))}
        </Form.Select>
        <Form.Select className="mx-2 mt-2" name="subCategory_id">
          <option>메인 카테고리 선택</option>
          {SUB_CATEGORY.map(category => (
            <option value={category.id} key={category.id}>
              {category.label}
            </option>
          ))}
        </Form.Select>
        <Form.Control
          type="file"
          className="mx-2 mt-2 pd-0"
          name="item_image"
          accept="image/*"
        />
        <Button type="submit" className="mx-2 mt-2">
          제발이거눌러주세요 제출
        </Button>
      </Form>
    </>
  );
}
