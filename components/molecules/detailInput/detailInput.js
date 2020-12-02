import React from "react";
import classNames from "classnames/bind";
import styles from "./detailInput.scss";
import Input from "../../atoms/Input/Input";

const cx = classNames.bind(styles);

const DetailInput = () => {
  return (
    <div className={cx("detailInput")}>
      <div>
        <Input />
      </div>
    </div>
  );
};

export default DetailInput;
