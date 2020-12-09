import React from "react";
import styles from "./ValidationMessage.scss";
import classNames from "classNames/bind";

const cx = classNames.bind(styles);

const ValidationMessage = ({ message, valid, inValid, warning }) => {
  return (
    <span
      className={cx("ValidationMessage", {
        valid: message?.includes(valid),
        inValid: message?.includes(inValid),
        warning: message?.includes(warning)
      })}
    >
      {message}
    </span>
  );
};

export default ValidationMessage;
