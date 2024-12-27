const getFormDataValues = (formData: FormData, keys: string[]): string[] => {
  const values: string[] = [];
  keys.forEach(key => {
    const value = formData.get(key);
    if (value !== null) {
      values.push(String(value)); // FormData.get(key)에서 반환된 값을 문자열로 변환
    } else {
      values.push('');
    }
  });
  return values;
};
export default getFormDataValues;
