import React from "react";

import styles from "./switch.scss";
import classNames from "classNames/bind";

const cx = classNames.bind(styles);

const Switch = ({ id, handleActive, actived }) => {
  return (
    <div className={cx("switch")}>
      <input
        className={cx("switchInput")}
        id={`${id}`}
        type="checkbox"
        checked={actived[id]}
        onChange={(e) => handleActive(e)}
        value={`${actived[id]}`}
      />
      <label className={cx("switchLabel")} htmlFor={`${id}`}>
        <span className={cx("switchButton")} />
        <span className={cx("off")}>OFF</span>
        <span className={cx("on")}>ON</span>
      </label>
    </div>
  );
};

export default Switch;
