import React, { useState } from "react";

import classNames from "classNames/bind";

import styles from "./viewPwd.scss";
import { Input } from "../../../../compnents/Input";

const cx = classNames.bind(styles);

const ViewPwd = ({ value, onChangeInput, firstCondition, pwdCheck }) => {
  return (
    <section className={cx("viewPwd")}>
      <div
        className={cx("container", {
          errorOn: value.firstPwd && !firstCondition,
        })}
      >
        <Input
          id={"firstPwd"}
          value={value.firstPwd}
          onChange={onChangeInput}
          placeholder={"8자 이상의 영문,숫자 조합의 비밀번호"}
        />
        {value.firstPwd && !firstCondition && (
          <span className={cx("message", "error")}>
            유효하지 않은 비밀번호 입니다.
          </span>
        )}
      </div>
      <div className={cx("container")}>
        <Input
          id={"secondPwd"}
          value={value.secondPwd}
          onChange={onChangeInput}
          placeholder={"비밀번호 확인"}
        />
        {pwdCheck && (
          <span className={cx("message", "success")}>
            비밀번호가 일치합니다.
          </span>
        )}
      </div>
    </section>
  );
};

export default ViewPwd;
