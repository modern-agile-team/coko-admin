const getFormDataValue = <T>(formData: FormData): T => {
  const formValues: { [key: string]: string } = {};

  formData.forEach((value, key) => {
    formValues[key] = value.toString();
  });

  return formValues as T;
};
export default getFormDataValue;
