import { Section } from '../types';

export const parseSectionData = (
  formData: Record<string, FormDataEntryValue>
): Omit<Section, 'id' | 'sectionId'> => {
  return {
    name: formData.sectionName.toString(),
  };
};
