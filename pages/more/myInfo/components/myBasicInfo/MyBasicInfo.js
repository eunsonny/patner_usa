import React from "react";
import classNames from "classNames/bind";
import styles from "./myBasicInfo.scss";

import MyInfoInput from "../../../../../components/molecules/myInfoInput/MyInfoInput";
import MyInfoInfo from "../../../../../components/molecules/myInfoInfo/MyInfoInfo";

const cx = classNames.bind(styles);

const MyBasicInfo = ({ myInfo, handleChange, position }) => {
  return (
    <section className={cx("myBasicInfo")}>
      <span className={cx("title")}>Basic Info.</span>
      <MyInfoInfo
        title="User name"
        content={myInfo.userName}
      />
      <MyInfoInput
        title="User number"
        name="userNumber"
        value={myInfo.userNumber}
        onChange={handleChange}
      />
      <MyInfoInfo
        title="Position"
        content={myInfo.position}
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
