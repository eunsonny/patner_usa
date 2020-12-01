import React from "react";

import styles from "./logoutModal.scss";

import classNames from "classNames/bind";

const cx = classNames.bind(styles);

const LogoutModal = ({ onClickLogout, openLogoutModal }) => {
  return (
    <div className={cx("logoutModal")}>
      <div className={cx("mainMessage")}>
        <span>정말 로그아웃 하시겠습니까?</span>
      </div>
      <div className={cx("check")}>
        <span onClick={openLogoutModal}>취소</span>
        <span data-name="okay" onClick={(e) => onClickLogout(e)}>
          확인
        </span>
      </div>
    </div>
  );
};

export default LogoutModal;
