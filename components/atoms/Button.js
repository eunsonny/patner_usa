import React from "react";
import classNames from "classnames/bind";
import styles from "./button.scss";

const cx = classNames.bind(styles);

const Button = ({ type, value, title, onClick, disabled, activeCondition }) => {
  return (
    <button
      type={type ? type : "submit"}
      onClick={onClick ? onClick : null}
      value={value ? value : null}
      disabled={disabled ? disabled : null}
      className={cx("Button", {
        active: activeCondition,
      })}
    >
      {title}
    </button>
  );
};

export default Button;
