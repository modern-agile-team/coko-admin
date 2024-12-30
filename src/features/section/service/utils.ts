import { Section } from '../types';

export const parseSectionData = (
  sectionFormData: Record<string, FormDataEntryValue>
): Omit<Section, 'id' | 'sectionId'> => {
  return {
    name: sectionFormData.sectionName.toString(),
  };
};
