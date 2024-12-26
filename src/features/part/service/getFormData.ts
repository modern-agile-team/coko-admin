const getFormDataValue = (formData: FormData, key: string): string => {
  const value = formData.get(key);
  if (typeof value === 'string') {
    return value;
  }
  throw new Error(`Expected a string value for ${key}`);
};
export default getFormDataValue;
