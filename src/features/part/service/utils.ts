import { Part } from '../types';

export const parsePartData = (
  formData: Record<string, FormDataEntryValue>
): Omit<Part, 'id'> => {
  return {
    name: formData.partName.toString(),
    sectionId: Number(formData.sectionId),
  };
};
