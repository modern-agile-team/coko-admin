import { useCosmeticItemQuery } from '@/features/item/queries';
import { CosmeticItem } from '@/features/item/types';
import { getImageUrl } from '@/utils/utils';
import { Button, ButtonGroup } from 'react-bootstrap';

interface CosmeticItemConatinerProps {
  handleEdit: (cosmeticItem: CosmeticItem) => void;
}
export default function CosmeticItemConatiner({
  handleEdit,
}: CosmeticItemConatinerProps) {
  const { data: CosmeticItems } = useCosmeticItemQuery.getCosmeticItems();

  return (
    <>
      {CosmeticItems.map(item => (
        <tr key={item.id} className="align-middle">
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.price}</td>
          <td>
            <img
              src={getImageUrl(item.image)}
              alt="설명 텍스트"
              style={{ width: '80px', height: '50px' }}
            />
            {item.image}
          </td>

          <td>
            <ButtonGroup size="sm" className="w-100" aria-label="Basic example">
              <Button variant="secondary" onClick={() => handleEdit(item)}>
                수정
              </Button>
            </ButtonGroup>
          </td>
        </tr>
      ))}
    </>
  );
}
