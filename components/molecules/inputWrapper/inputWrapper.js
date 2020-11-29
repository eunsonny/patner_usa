import React from "react";
import classNames from "classnames/bind";
import Input from "../../atoms/Input";
import styles from "./inputWrapper.scss";

const cx = classNames.bind(styles);

const inputWrapper = ({
  id,
  name,
  placeholder,
  type,
  value,
  onChange,
  subOnClick,
}) => {
  return (
    <div className={cx("inputWrapper")}>
      <Input
        type={type}
        value={value}
        id={id}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        subOnClick={subOnClick}
      ></Input>
    </div>
  );
};

export default inputWrapper;