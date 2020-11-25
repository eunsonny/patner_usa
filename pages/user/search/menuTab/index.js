import React from "react";

import classNames from "classNames/bind";

import styles from "./menuTap.scss";

const cx = classNames.bind(styles);

const MenuTab = ({ tab, handleCheckTap }) => {
  return (
    <section className={cx("MenuTab")}>
      <div className={cx("top")}></div>
      <div>
        <img
          src="/images/backArrow.png"
          alt="backArrow"
          className={cx("backArrow")}
        />
      </div>
      <div className={cx("searchContainer")}>
        <div
          data-name="userId"
          onClick={handleCheckTap}
          className={cx({ on: tab.searchId || tab.userId })}
        >
          아이디 찾기
        </div>
        <div
          data-name="password"
          onClick={handleCheckTap}
          className={cx({ on: tab.searchPwd || tab.password })}
        >
          비밀번호 재등록
        </div>
      </div>
    </section>
  );
};

export default MenuTab;
