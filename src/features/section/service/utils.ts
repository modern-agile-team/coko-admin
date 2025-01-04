import { Section } from '../types';

export const parseSectionData = (
  sectionFormData: Record<string, FormDataEntryValue>
): Omit<Section, 'id' | 'sectionId' | 'order'> => {
  return {
    name: sectionFormData.sectionName.toString(),
  };
};
