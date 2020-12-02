import React from "react";
import styles from "./ValidationMessage.scss";
import classNames from "classNames/bind";

const cx = classNames.bind(styles);

const ValidationMessage = ({ message, valid, inValid }) => {
  return (
    <span
      className={cx("ValidationMessage", {
        valid: message?.includes(valid),
        inValid: message?.includes(inValid),
      })}
    >
      {message}
    </span>
  );
};

export default ValidationMessage;
