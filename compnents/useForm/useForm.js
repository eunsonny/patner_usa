import React, { useState, useEffect } from "react";

const useForm = (validate) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [clicked, setClicked] = useState("");

  useEffect(() => {
    // form submit이 되었고, validation이 모두 통과되었다면
    if (isSubmitting && Object.keys(errors).length === 0) {
      callback(); // 다음 액션(로그인, 회원가입 등) 유도
    }
  }, [errors]); // errors가 변경된 경우에만 update 될 수 있도록 두 번째 파라미터 전달

  const handleChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  const handleClick = (event) => {
    event.stopPropagation();
    setClicked(event.target.value);
    // setErrors(validate(values, clicked))
  };
  // form submit 확인 및 input 값을 validate하여 유효하지 않은 경우에는 error 메시지 저장

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    setIsSubmitting(true);
    setErrors(validate(values, clicked));
  };

  return {
    handleChange,
    handleSubmit,
    handleClick,
    values,
    errors,
  };
};

export default useForm;
