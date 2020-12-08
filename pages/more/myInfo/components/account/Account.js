import React from "react";
import classNames from "classNames/bind";
import styles from "./account.scss";

import MyInfoInfo from "../../../../../components/molecules/myInfoInfo/MyInfoInfo";

const cx = classNames.bind(styles);

const Account = ({ myInfo, handleChange }) => {
  return (
    <section className={cx("account")}>
      <span className={cx("title")}>Account.</span>
      <MyInfoInfo
        title="User ID"
        name="userId"
        content={myInfo.userId}
        onChange={handleChange}
      />
      <MyInfoInfo title="password" />
      <MyInfoInfo title="password Check" />
    </section>
  );
};

export default Account;
