import React from "react";
import classNames from "classNames/bind";
import styles from "./myBasicInfo.scss";

import MyInfoInput from "../../../../../components/molecules/myInfoInput/MyInfoInput";

const cx = classNames.bind(styles);

const MyBasicInfo = ({ myInfo, handleChange }) => {
  return (
    <section className={cx("myBasicInfo")}>
      <span className={cx("title")}>Basic Info.</span>
      <MyInfoInput
        title="User name"
        name="userName"
        value={myInfo.userName}
        onChange={handleChange}
      />
      <MyInfoInput
        title="User number"
        name="userNumber"
        value={myInfo.userNumber}
        onChange={handleChange}
      />
      <MyInfoInput
        title="Position"
        name="position"
        value={myInfo.position}
        onChange={handleChange}
      />
      <MyInfoInput
        title="e-mail"
        name="email"
        value={myInfo.email}
        onChange={handleChange}
      />
    </section>
  );
};

export default MyBasicInfo;
