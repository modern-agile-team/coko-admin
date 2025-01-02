import { Part } from '../types';

export const parsePartData = (
  partFormData: Record<string, FormDataEntryValue>
): Omit<Part, 'id' | 'order'> => {
  return {
    name: partFormData.partName.toString(),
    sectionId: Number(partFormData.sectionId),
  };
};
