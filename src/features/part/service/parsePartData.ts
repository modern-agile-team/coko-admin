import { Part } from '../types';

export const parsePartData = (part: Record<string, any>): Omit<Part, 'id'> => {
  return {
    name: part.partName.toString(),
    sectionId: Number(part.sectionId),
  };
};
