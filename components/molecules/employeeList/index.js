import React from "react";

import styles from "./employeeList.scss";
import classNames from "classNames/bind";
import Switch from "../../atoms/switch/switch";

const cx = classNames.bind(styles);

const EmployeeList = ({ name, id, del, handleActive, actived }) => {
  return (
    <li className={cx("employeeList")}>
      <span className={cx("name")}>{name}</span>
      <Switch handleActive={(e) => handleActive(e)} id={id} actived={actived} />
      <span id={id} className={cx("delete")} onClick={(e) => del(e)}>
        삭제
      </span>
    </li>
  );
};

export default EmployeeList;
