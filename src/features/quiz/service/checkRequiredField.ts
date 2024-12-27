const checkRequiredField = (field: any, fieldName: string): void => {
  if (!field) {
    throw new Error(`${fieldName} 필드가 없습니다.`);
  }
};

export default checkRequiredField;
