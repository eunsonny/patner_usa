import React, { useEffect, useState } from "react";
import classNames from "classNames/bind";
import styles from "./myInfo.scss";
import useStore from "../../../stores/useStore";
import { useObserver } from "mobx-react";
import { useCookies } from "react-cookie";
import Router from "next/router";

import Account from "./components/account/Account";
import MyBasicInfo from "./components/myBasicInfo/MyBasicInfo";
import MyBusinessInfo from "./components/myBusinessInfo/MyBusinessInfo";
import HalfButton from "../../../components/atoms/halfButton/HalfButton";
import UserInfo from "../../../api/userInfo";

const cx = classNames.bind(styles);

const MyInfo = () => {
  const [clicked, setClicked] = useState("");
  const [cookies] = useCookies();

  const { myInfoStore } = useStore();
  const { TOKEN } = cookies;

  useEffect(() => {
    const response = new UserInfo(TOKEN);
    response.GET_USER_INFO().then((res) => {
      console.log(res);
      myInfoStore.addMyInfo("userId", res.login_id);
      myInfoStore.addMyInfo("userName", res.name);
      myInfoStore.addMyInfo("userNumber", res.contact);
      myInfoStore.addMyInfo("position", res.position);
      myInfoStore.addMyInfo("email", res.email);
      myInfoStore.addMyInfo("companyName", res.company_name);
      myInfoStore.addMyInfo("companyAddress", res.address);
      myInfoStore.addMyInfo("intro", res.introduction);
    });
  }, []);

  useEffect(() => {
    handleSubmit();
    return setClicked("");
  }, [clicked]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    myInfoStore.addMyInfo(name, value);
  };

  const handleClick = (e) => {
    console.log(e.target.value);
    setClicked(e.target.value);
  };

  const handleSubmit = () => {
    if (clicked === "취소") {
      Router.push("/more");
    }

    if (clicked === "정보수정") {
      const response = new UserInfo(TOKEN);
      response
        .MODIFY_USER_INFO()
        .then((res) => {
          if (res.message === "info changed") {
            alert("정보가 수정되었습니다.");
          }
        })
        .then(Router.push("/more"));
    }
  };

  return useObserver(() => (
    <div className={cx("myInfo")}>
      <div className={cx("header")}>
        <div className={cx("headLine")}></div>
        <button onClick={() => Router.push("/more")}>
          <img src="/images/blue_arrow_left.svg" className={cx("arrow")} />
        </button>
        <span>내 정보 수정</span>
      </div>
      <div className={cx("container")}>
        <Account myInfo={myInfoStore.myInfo} handleChange={handleChange} />
        <div className={cx("middleLine")}></div>
        <MyBasicInfo myInfo={myInfoStore.myInfo} handleChange={handleChange} />
        <div className={cx("middleLine")}></div>
        <MyBusinessInfo
          myInfo={myInfoStore.myInfo}
          handleChange={handleChange}
        />
        <HalfButton
          title1="Cancel"
          value1="취소"
          title2="Save"
          value2="정보수정"
          onClick={handleClick}
        />
      </div>
    </div>
  ));
};

export default MyInfo;
