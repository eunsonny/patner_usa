import React from 'react';
import classNames from "classnames/bind";
import styles from "./halfButton.scss";

const cx = classNames.bind(styles);

const HalfButton = ({title1, title2}) => {
  return (
    <div className={cx("halfButton")}>
      <button className={cx("button1")}>{title1}</button>
      <button className={cx("button2")}>{title2}</button>
    </div>
  );
};

export default HalfButton;