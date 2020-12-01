export const REQUEST_NUMBER = (value) => {
  const { userName, phone } = value;
  const nameValidation = userName;
  const phoneValidation = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{4}-?[0-9]{4}$/.test(
    phone
  );
  return nameValidation && phoneValidation;
};
