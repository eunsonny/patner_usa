import React from "react";
import classNames from "classNames/bind";
import styles from "./halfButton.scss";

const cx = classNames.bind(styles);

const HalfButton = ({ title1, title2, value1, value2, onClick }) => {
  return (
    <div className={cx("halfButton")}>
      <button
        value={value1}
        className={cx("button1")}
        onClick={onClick || null}
      >
        {title1}
      </button>
      <button
        value={value2}
        className={cx("button2")}
        onClick={onClick || null}
      >
        {title2}
      </button>
    </div>
  );
};

export default HalfButton;
