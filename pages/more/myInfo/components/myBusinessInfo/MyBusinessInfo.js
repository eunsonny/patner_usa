import React from "react";
import classNames from "classNames/bind";
import styles from "./myBusinessInfo.scss";

import MyInfoInput from "../../../../../components/molecules/myInfoInput/MyInfoInput";
import MyInfoInfo from "../../../../../components/molecules/myInfoInfo/MyInfoInfo";

const cx = classNames.bind(styles);

const MyBusinessInfo = ({ myInfo, handleChange, position }) => {
  const test = () => {
    if (position === "employee") {
      return (
        <>
          <MyInfoInfo title="Company name" content={myInfo.companyName} />
          <MyInfoInfo title="Company Address" content={myInfo.companyAddress} />
          <MyInfoInfo title="Intro" content={myInfo.intro} />
        </>
      );
    } else {
      return (
        <>
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
            name="intro"
            onChange={handleChange}
          />
        </>
      );
    }
  };

  return (
    <div className={cx("myBusinessInfo")}>
      <span className={cx("title")}>Business Info.</span>
      {test()}
      {/* <MyInfoInput
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
        name="intro"
        onChange={handleChange}
      /> */}
      <MyInfoInfo title="국산차량 대수" />
      <MyInfoInfo title="수입차량 대수" />
    </div>
  );
};

export default MyBusinessInfo;
