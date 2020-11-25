import React, { useState, useEffect } from "react";

import { useRouter } from "next/router";
import classNames from "classNames/bind";

import styles from "./search.scss";

import {
  VERIFY_RE_QUEST,
  VERIFY_TEXT_FAIL,
  VERIFY_TEXT_SUCCESS,
} from "../../../constants/Label";

import SearchId from "./searchId";
import SearchPwd from "./searchPwd";
import ViewId from "./viewId";
import ViewPwd from "./viewPwd";
import MenuTab from "./menuTab";

import Button from "../../../compnents/button";

const cx = classNames.bind(styles);
const validation = /^(?=.*\d)(?=.*[A-Za-z])[A-Za-z0-9]\w{7,}$/;

const Search = (props) => {
  const router = useRouter();

  const [tab, setTap] = useState({ userId: true });
  const [value, setValue] = useState({});
  const [request, setRequest] = useState(null);
  const [verifyCheck, setVerifyCheck] = useState(false);
  const [verifyText, setVerifyText] = useState("");
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (counter !== 0 && verifyCheck === false) {
      const timer =
        counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
      return () => clearInterval(timer);
    }

    if (counter === 0 && verifyCheck === false) {
      setVerifyText(VERIFY_RE_QUEST);
    }
  }, [counter]);

  const handleCheckTap = (e) => {
    setValue({});
    setVerifyCheck(false);
    setRequest(null);
    setVerifyText("");
    const tapInit = {};
    const tapName = e.target.dataset.name;
    setTap({ ...tapInit, [tapName]: true });
  };

  const onChangeInput = (e) => {
    setValue({ ...value, [e.target.id]: e.target.value });
  };

  const onClickRequest = () => {
    // 이름, 핸드폰 번호를 포함한 api 통신 (post)
    // 1. 아이디 찾기인 경우 2. 비밀번호(id추가) 재등록의 경우
    setRequest(true);
    setCounter(180);
  };

  const onClickVerify = () => {
    if (value.verify.length > 5 && value.verify.includes(6)) {
      setVerifyCheck(true);
      setVerifyText(VERIFY_TEXT_SUCCESS);
    } else {
      setVerifyCheck(false);
      setVerifyText(VERIFY_TEXT_FAIL);
    }
  };

  const goToLogin = () => {
    // 1. 비밀번호인 경우 tab.searchPwd && Api 통신하고 이동 (patch)
    // 2. 아이디 찾기의 경우 그냥 이동
    router.push("/user/login");
  };

  const searchInfo = {
    onChangeInput,
    onClickVerify,
    onClickRequest,
    verifyCheck,
    request,
    counter,
    verifyText,
    value,
  };

  const { firstPwd, secondPwd } = value;

  const firstCondition = `${firstPwd}`.match(validation) && true;

  const secondCondition = firstPwd === secondPwd;

  const pwdCheck = firstCondition && secondCondition;

  return (
    <section className={cx("search")}>
      <MenuTab tab={tab} handleCheckTap={handleCheckTap} />
      <div className={cx("inputContainer")}>
        {tab.userId && (
          <>
            <SearchId searchInfo={searchInfo} />
            <Button
              content="Search"
              name="searchId"
              verifyCheck={verifyCheck}
              onClickNextBtn={handleCheckTap}
            />
          </>
        )}
        {tab.password && (
          <>
            <SearchPwd searchInfo={searchInfo} />
            <Button
              content="Next"
              name="searchPwd"
              verifyCheck={verifyCheck}
              onClickNextBtn={handleCheckTap}
            />
          </>
        )}
        {tab.searchId && (
          <>
            <ViewId value={value} />
            <Button
              content="로그인 화면으로 이동하기"
              name="searchId"
              verifyCheck={verifyCheck}
              onClickNextBtn={goToLogin}
            />
          </>
        )}
        {tab.searchPwd && (
          <>
            <ViewPwd
              value={value}
              onChangeInput={onChangeInput}
              firstCondition={firstCondition}
              pwdCheck={pwdCheck}
            />
            <Button
              content="로그인 화면으로 이동하기"
              name="searchPwd"
              verifyCheck={pwdCheck || verifyCheck}
              onClickNextBtn={goToLogin}
            />
          </>
        )}
      </div>
    </section>
  );
};

export default Search;
