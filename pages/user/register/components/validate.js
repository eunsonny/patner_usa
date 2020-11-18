const validate = (values = {}, clicked) => {
  const clickValidate = (values = {}, clicked) => {
    switch (clicked) {
      // case "ID중복체크":
      //   const isIdValid = values.userId.includes("s");
      //   const idMsg = isIdValid
      //     ? "사용가능한 아이디 입니다."
      //     : "중복된 아이디 입니다.";
      //   return { userId: idMsg };

      case "인증요청":
      case "재요청":
        const requested = String(values.userNumber)?.length > 9;
        let requestMsg = requested ? "인증번호를 발송하였습니다" : null;
        return { certifiRequest: requestMsg };

      case "인증번호확인":
        const isNumCertified = String(values.certifiNum)?.includes("6");
        const numMsg = isNumCertified
          ? "인풋 창 숨김"
          : "인증번호가 불일치합니다";
        requestMsg = isNumCertified
          ? "인증에 성공하였습니다"
          : "인증번호를 발송하였습니다";
        return { certifiNum: numMsg, certifiRequest: requestMsg };
    }
  };

  const changeValidate = (values = {}) => {
    const isPwdValid = values.checkPassword === values.password;
    const pwdMsg = isPwdValid
      ? "비밀번호가 일치 합니다."
      : "비밀번호가 불일치 합니다.";
    return { checkPassword: pwdMsg };
  };

  return clicked ? clickValidate(values, clicked) : changeValidate(values);
};

export default validate;
