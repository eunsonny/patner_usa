import React from "react";
import classNames from "classNames/bind";
import styles from "./myInfoInput.scss";

import Input from "../../atoms/Input/Input";

const cx = classNames.bind(styles);

const MyInfoInput = ({ title, name, value, onChange, type }) => {
  return (
    <div className={cx("myInfoInput")}>
      <div className={cx("inputContainer")}>
        <span className={cx("title")}>{title}</span>
        <Input name={name} value={value} onChange={onChange} type={type} />
      </div>
    </div>
  );
};

export default MyInfoInput;
