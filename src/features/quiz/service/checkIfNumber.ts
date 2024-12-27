const checkIfNumber = (value: any, fieldName: string): void => {
  if (isNaN(value)) {
    throw new Error(`${fieldName}를 선택해주세요`);
  }
};
export default checkIfNumber;
