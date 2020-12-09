export const VERIFY_REQUEST = (value) => {
  const { userName, phone } = value;
  const nameValidation = userName;
  const phoneValidation = /^\d{3}-\d{3,4}-\d{4}$/.test(phone);
  return nameValidation && phoneValidation;
};

export const PWD_VALIDATION = /^(?=.*\d)(?=.*[A-Za-z])[A-Za-z\d]{8,}$/;
