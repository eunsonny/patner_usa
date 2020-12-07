import React from "react";
import classNames from "classNames/bind";
import styles from "./detailInput.scss";
import Input from "../../atoms/Input/Input";

const cx = classNames.bind(styles);

const DetailInput = ({ title, name, value, onChange, onClick }) => {
  return (
    <div className={cx("detailInput")}>
      <div className={cx("content")}>
        <span>{title}</span>
        <Input
          name={name}
          onChange={onChange}
          value={value}
          onClick={onClick}
        />
      </div>
    </div>
  );
};

export default DetailInput;
