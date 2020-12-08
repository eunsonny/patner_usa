import React, { useReducer } from "react";

import classNames from "classNames/bind";

import styles from "./menuTab.scss";
import { useRouter } from "next/router";

const cx = classNames.bind(styles);

const MenuTab = ({ tab, handleCheckTap }) => {
  const router = useRouter();

  return (
    <section className={cx("MenuTab")}>
      <div className={cx("top")}></div>
      <div>
        <img
          src="/images/backArrow.png"
          alt="backArrow"
          className={cx("backArrow")}
          onClick={() => router.back()}
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
