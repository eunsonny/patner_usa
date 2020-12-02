import React from "react";
import classNames from "classNames/bind";
import styles from "./detailInfo.scss";

const cx = classNames.bind(styles);

const DetailInfo = ({ title, content }) => {
  return (
    <div className={cx("detailInfo")}>
      <div className={cx("content")}>
        <span>{title}</span>
        <span>{content}</span>
      </div>
    </div>
  );
};

export default DetailInfo;
