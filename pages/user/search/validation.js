export const REQUEST_NUMBER = (value) => {
  const { userName, phone } = value;
  const nameValidation = userName;
  const phoneValidation = /^\d{3}-\d{3,4}-\d{4}$/.test(phone);
  return nameValidation && phoneValidation;
};
