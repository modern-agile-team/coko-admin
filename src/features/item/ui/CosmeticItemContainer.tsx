import { useCosmeticItemQuery } from '@/features/item/queries';
import { CosmeticItem, CosmeticItemQuery } from '@/features/item/types';
import { getImageUrl } from '@/utils/utils';
import { Button, ButtonGroup } from 'react-bootstrap';

interface CosmeticItemContainerProps {
  handleEdit: (cosmeticItem: CosmeticItem) => void;
  query?: CosmeticItemQuery;
}
export default function CosmeticItemContainer({
  handleEdit,
  query,
}: CosmeticItemContainerProps) {
  const { data: CosmeticItems } = useCosmeticItemQuery.getCosmeticItems(query);

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
