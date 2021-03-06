import React from "react";
import classNames from "classNames/bind";
import styles from "./myInfoInfo.scss";

const cx = classNames.bind(styles);

const MyInfoInfo = ({ title, content }) => {
  return (
    <div className={cx("myInfoInfo")}>
      <div className={cx("infoContainer")}>
        <span className={cx("title")}>{title}</span>
        <span className={cx("content")}>{content}</span>
      </div>
    </div>
  );
};

export default MyInfoInfo;
