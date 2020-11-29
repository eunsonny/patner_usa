import React from "react";
import classNames from "classnames/bind";
import Input from "../../atoms/Input";
import Button from "../../atoms/Button";
import styles from "./inputWithBtn.scss";

const cx = classNames.bind(styles);

const inputWithBtn = ({
  id,
  name,
  inputType,
  placeholder,
  onChange,
  inputValue,
  onClick,
  buttonValue,
  buttonType,
  disabled,
  buttonTitle,
  activeCondition
}) => {
  return (
      <div className={cx("inputWithBtn")}>
        <Input
          id={id}
          name={name}
          type={inputType}
          placeholder={placeholder}
          onChange={onChange}
          value={inputValue}
        />
        <Button
          value={buttonValue}
          type={buttonType}
          title={buttonTitle}
          onClick={onClick}
          disabled={disabled}
          activeCondition={activeCondition}
        />
      </div>
  );
};

export default inputWithBtn;
