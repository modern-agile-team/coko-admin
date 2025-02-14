import { useCosmeticItemQuery } from '@/features/item/queries';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { parseCosmeticItemData } from '@/features/item/service/utils';
import { MAIN_CATEGORY, SUB_CATEGORY } from '@/features/item/constants';
import { FormEventHandler } from 'react';
import { CosmeticItem } from '@/features/item/types';
import { filterFalsyValues } from '@/utils/validator';

interface CosmeticItemFormProps {
  cosmeticItem?: CosmeticItem;
  closeModal: () => void;
}

export default function CosmeticItemForm({
  cosmeticItem,
  closeModal,
}: CosmeticItemFormProps) {
  const { mutate: createMutation } = useCosmeticItemQuery.createCosmeticItem();
  const { mutate: updateMutation } = useCosmeticItemQuery.updateCosmeticItem();
  const { mutate: upsertImage } = useCosmeticItemQuery.upsertImage();

  const handleMutate: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formcosmeticItem = Object.fromEntries(formData.entries());
    const image = formData.get('item_image') as File;
    const parsedCosmeticItem = {
      ...parseCosmeticItemData(formcosmeticItem),
      image: image.name,
    };
    upsertImage(image);
    const onSuccess = () => {
      closeModal();
      upsertImage(image, {});
    };

    if (cosmeticItem) {
      updateMutation(
        {
          id: cosmeticItem.id,
          ...filterFalsyValues({ ...parsedCosmeticItem, image: image.name }),
        },
        {
          onSuccess,
        }
      );
      return;
    }
    createMutation(
      { ...filterFalsyValues({ ...parsedCosmeticItem, image: image.name }) },
      {
        onSuccess,
      }
    );
  };

  return (
    <>
      <Form onSubmit={handleMutate}>
        <FloatingLabel label="아이템 이름" className="mx-2 mt-2">
          <Form.Control
            type="text"
            name="item_name"
            defaultValue={cosmeticItem?.name}
          />
        </FloatingLabel>
        <FloatingLabel label="아이템 가격" className="mx-2 mt-2">
          <Form.Control
            type="text"
            name="item_price"
            defaultValue={cosmeticItem?.price}
          />
        </FloatingLabel>
        <Form.Select
          className="mx-2 mt-2"
          name="mainCategory_id"
          defaultValue={cosmeticItem?.mainCategoryId}
        >
          <option>메인 카테고리 선택</option>
          {MAIN_CATEGORY.map(category => (
            <option value={category.id} key={category.id}>
              {category.label}
            </option>
          ))}
        </Form.Select>
        <Form.Select
          className="mx-2 mt-2"
          name="subCategory_id"
          defaultValue={cosmeticItem?.subCategoryId}
        >
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
          제출
        </Button>
      </Form>
    </>
  );
}
