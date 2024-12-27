import { hasEmptyValues } from '../../../utils/validator';
import { Part } from '../types';
export const getPartFormData = (formData: FormData): Omit<Part, 'id'> => {
  const part = Object.fromEntries(formData.entries());

  hasEmptyValues(part);
};
