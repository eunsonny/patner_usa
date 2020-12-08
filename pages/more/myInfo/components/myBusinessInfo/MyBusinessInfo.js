import React from "react";
import classNames from "classNames/bind";
import styles from "./myBusinessInfo.scss";

import MyInfoInput from "../../../../../components/molecules/myInfoInput/MyInfoInput";

const cx = classNames.bind(styles);

const MyBusinessInfo = ({ myInfo, handleChange }) => {
  return (
    <div className={cx("myBusinessInfo")}>
      <span className={cx("title")}>Business Info.</span>
      <MyInfoInput
        title="Company name"
        name="companyName"
        value={myInfo.companyName}
        onChange={handleChange}
      />
      <MyInfoInput
        title="Company Address"
        name="companyAddress"
        value={myInfo.companyAddress}
        onChange={handleChange}
      />
      <MyInfoInput
        title="Intro"
        value={myInfo.intro}
        name="Intro"
        onChange={handleChange}
      />
      <MyInfoInput title="국산차량 대수" />
      <MyInfoInput title="수입차량 대수" />
    </div>
  );
};

export default MyBusinessInfo;
