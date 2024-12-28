import { Section } from '../types';

export const parseSectionData = (
  section: Record<string, any>
): Omit<Section, 'id' | 'sectionId'> => {
  return {
    name: section.sectionName.toString(),
  };
};
