import React from "react";

import classNames from "classNames/bind";

import styles from "./Button.scss";

const cx = classNames.bind(styles);

const Button = ({ content, verifyCheck, onClickNextBtn, name }) => {
  return (
    <button
      className={cx({ on: verifyCheck }, { off: !verifyCheck })}
      data-name={name || null}
      onClick={(e) => onClickNextBtn(e) || null}
      disabled={!verifyCheck}
    >
      {content}
    </button>
  );
};
export default Button;
