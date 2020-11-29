const newValidate = (values ={}) => {
  const validator  = (name) => {
    const pwdRegex = /^(?=.*\d)(?=.*[A-Za-z])[A-Za-z\d]{8,}$/;
    const emailRegex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    const userNumRegex = /^\d{3}-\d{3,4}-\d{4}$/;
    const validationTable = {
      userId : (id) => id.length > 5,
      password : (password) => pwdRegex.test(password),
      checkPassword : (checkPassword) => checkPassword === values.password,
      userName: (userName) => userName,
      userNumber : (number) => userNumRegex.test(number),
      position: (position) => position,
      email: (email) => emailRegex.test(email),
      companyName : (companyName) => companyName,
      intro : (intro) => intro,
      certifiNum: (certifiNum) =>  certifiNum,
      // certifiNum : (number) => String(number).includes("6"),
    }
    return validationTable[name]
  }

  const errorMsg = {
    userId : "아이디는 다섯글자 이상이여야 합니다.",
    password : "비밀번호는 영문과 숫자 포함 8자 이상이여야 합니다.",
    checkPassword : "비밀번호가 불일치 합니다.",
    userName: "이름을 입력해주세요.",
    // userNumber : "형식에 맞지 않는 번호입니다.",
    position: "직무를 입력해주세요.",
    email: "형식에 맞지 않는 이메일 입니다.",
    // certifiNum : "인증번호가 불일치합니다.",
  }

  const validMsg = {
    userId : null,
    password: null,
    checkPassword : "비밀번호가 일치 합니다.",
    userName: null,
    // userNumber: null,
    position: null,
    email: null,
    // certifiNum : "인증번호를 발송하였습니다."
  }

  const isNoError = Object
    .entries(values)
    .every(([key, value]) =>  validator(key)(value));

  const validReducer = ({name, value}) => {
    const typeTable = {
      userId : change
    }
  }

  const keys = Object.keys(values);
  const results = Object
    .entries(values)
    .map(([key, value]) => validator(key)(value) 
    ? validMsg[key] : errorMsg[key]);
  
  const totalResults = keys.reduce((acc, value, i) => (acc[value] = results[i], acc), {});

  // console.log(Object.entries(values).map(([key, value]) => validator(key)(value) ? validMsg[key] : errorMsg[key] ))
  return {isNoError, totalResults}
}

export default newValidate
