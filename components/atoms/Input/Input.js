import React from "react";

const Input = ({
  id,
  name,
  placeholder,
  type,
  value,
  onChange,
  subOnClick,
}) => {
  return (
    <input
      id={id || null}
      name={name || null}
      type={type || "text"}
      placeholder={placeholder}
      onChange={onChange || null}
      value={value || ""}
      onClick={subOnClick || null}
    />
  );
};

export default Input;
