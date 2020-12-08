import React from "react";

import classNames from "classNames/bind";
import styles from "./menuTab.scss";

const cx = classNames.bind(styles);

const MenuTab = ({ onMenuClick, menuOnOff }) => {
  const menuTab = ["내 지역콜", "제안중", "예약확정", "배차중", "반납완료"];

  return (
    <div className={cx("menuTab")}>
      {menuTab.map((list, idx) => (
        <div
          id={idx}
          key={idx}
          className={cx({ on: menuOnOff[idx] }, { off: !menuOnOff[idx] })}
          onClick={onMenuClick}
        >
          <span>{list}</span>
        </div>
      ))}
    </div>
  );
};

export default MenuTab;
