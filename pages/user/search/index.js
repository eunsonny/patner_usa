import React, { useState, useEffect } from "react";

import { useRouter } from "next/router";
import classNames from "classNames/bind";

import styles from "./search.scss";

import {
  VERIFY_RE_QUEST,
  VERIFY_TEXT_FAIL,
  VERIFY_TEXT_SUCCESS,
  GO_TO_LOGIN,
} from "../../../constants/Label";

import SearchId from "./searchId";
import SearchPwd from "./searchPwd";
import ViewId from "./viewId";
import ViewPwd from "./viewPwd";
import MenuTab from "./menuTab";

import Button from "../../../compnents/button";
import { REQUEST_NUMBER } from "../../api/searchUserInfo";

const cx = classNames.bind(styles);
const validation = /^(?=.*\d)(?=.*[A-Za-z])[A-Za-z\d]{8,}$/;

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
  }, [counter, value]);

  const handleCheckTap = (e) => {
    setValue({});
    setVerifyCheck(false);
    setRequest(null);
    setVerifyText("");
    const tapName = e.target.dataset.name;
    setTap({ [tapName]: true });
  };

  const handleClickNext = (e) => {
    const tapName = e.target.dataset.name;
    setTap({ [tapName]: true });
  };

  const onChangeInput = (e) => {
    setValue({ ...value, [e.target.id]: e.target.value });
  };

  const onClickRequest = () => {
    if (REQUEST_NUMBER(value)) {
      setRequest(true);
      setCounter(180);
    } else {
      setRequest(false);
      setCounter(0);
      alert("올바를 정보를 입력해주세요.");
    }
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
    // tab.searchPwd &&
    //   SEARCH_USER_PASSWORD(value).then((res) => alert(res.message));
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
              activeBtn={verifyCheck}
              onClickNextBtn={handleClickNext}
            />
          </>
        )}
        {tab.password && (
          <>
            <SearchPwd searchInfo={searchInfo} />
            <Button
              content="Next"
              name="searchPwd"
              activeBtn={verifyCheck}
              onClickNextBtn={handleClickNext}
            />
          </>
        )}
        {tab.searchId && (
          <>
            <ViewId value={value} />
            <Button
              content={GO_TO_LOGIN}
              name="searchId"
              activeBtn={tab.searchId}
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
              content={"재등록"}
              name="searchPwd"
              activeBtn={pwdCheck}
              onClickNextBtn={goToLogin}
            />
          </>
        )}
      </div>
    </section>
  );
};

export default Search;
