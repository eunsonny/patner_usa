const validate = (values = {}, name) => {
  const reg = {
    pwd: /^(?=.*\d)(?=.*[A-Za-z])[A-Za-z\d]{8,}$/,
    email: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
    userNum: /^\d{3}-\d{3,4}-\d{4}$/,
  };

  const validationTable = {
    userId: (id) => id,
    password: (password) => reg.pwd.test(password),
    checkPassword: (checkPassword) => checkPassword === values.password,
    userName: (userName) => userName,
    userNumber: (number) => reg.userNum.test(number),
    position: (position) => position,
    email: (email) => reg.email.test(email),
    companyName: (companyName) => companyName,
    intro: (intro) => intro,
    certifiNum: (certifiNum) => certifiNum,
  };

  const errorMsg = {
    password: "비밀번호는 영문과 숫자 포함 8자 이상이여야 합니다.",
    checkPassword: "비밀번호가 불일치 합니다.",
    userName: "이름을 입력해주세요.",
    position: "직무를 입력해주세요.",
    email: "형식에 맞지 않는 이메일 입니다.",
  };

  const validMsg = {
    password: null,
    checkPassword: "비밀번호가 일치 합니다.",
    userName: null,
    position: null,
    email: null,
  };

  const isValid = Object.entries(values).every(([key, value]) =>
    validationTable[key](value)
  );

  const validator = (name) => {
    const isNeedToCheck = name !== ("userId" || "userNumber");
    if (!name || !isNeedToCheck) return;

    const resultText = validationTable[name](values[name])
      ? validMsg[name]
      : errorMsg[name];
    return { [name]: resultText };
  };

  const totalResults = validator(name);

  return { isValid, totalResults };
};

export default validate;
