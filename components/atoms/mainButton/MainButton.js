import React from "react";
import classNames from "classNames/bind";
import styles from "./mainButton.scss";

const cx = classNames.bind(styles); 

const MainButton = ({type, name, value, onClick, condition, title}) => {

  return (
    <button
      type={type || "submit"}
      name={name || null}
      value={value || null}
      onClick={onClick || null}
      className={cx("mainButton", { active: condition })}
    >
      {title}
    </button>
  );
};

export default MainButton;
