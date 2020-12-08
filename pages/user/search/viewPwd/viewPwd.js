import React, { useState } from "react";

import classNames from "classNames/bind";

import styles from "./viewPwd.scss";
import { SearchInput } from "../../../../components/atoms/SearchInput/searchInput";

const cx = classNames.bind(styles);

const ViewPwd = ({
  value: { firstPwd, secondPwd },
  onChangeInput,
  firstCondition,
  pwdCheck,
}) => {
  return (
    <section className={cx("viewPwd")}>
      <div
        className={cx("container", {
          errorOn: firstPwd && !firstCondition,
        })}
      >
        <SearchInput
          id={"firstPwd"}
          value={firstPwd}
          onChange={onChangeInput}
          placeholder={"8자 이상의 영문,숫자 조합의 비밀번호"}
        />
        {firstPwd && !firstCondition && (
          <span className={cx("message", "error")}>
            유효하지 않은 비밀번호 입니다.
          </span>
        )}
        {firstPwd && firstCondition && (
          <span className={cx("message", "success")}>
            유효한 비밀번호입니다.
          </span>
        )}
      </div>
      <div className={cx("container")}>
        <SearchInput
          id={"secondPwd"}
          value={secondPwd}
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
