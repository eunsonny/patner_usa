import React, { useState, useEffect } from "react";

import { useRouter } from "next/router";
import classNames from "classNames/bind";
import Swal from "sweetalert2";

import styles from "./search.scss";

import {
  VERIFY_RE_QUEST,
  VERIFY_TEXT_FAIL,
  VERIFY_TEXT_SUCCESS,
  GO_TO_LOGIN,
} from "../../../constants/Label";

import SearchButton from "../../../components/atoms/searchButton/searchButton";
import SearchId from "./searchId/searchId";
import SearchPwd from "./searchPwd/searchPwd";
import ViewId from "./viewId/viewId";
import ViewPwd from "./viewPwd/viewPwd";
import MenuTab from "./menuTab/menuTab";

import UserSearch from "../../../api/searchUserInfo";

import { VERIFY_REQUEST, PWD_VALIDATION } from "../../../constants/validation";

const cx = classNames.bind(styles);

const Search = (props) => {
  const router = useRouter();

  const [tab, setTap] = useState({ userId: true });
  const [value, setValue] = useState({});
  const [request, setRequest] = useState(null);
  const [verifyCheck, setVerifyCheck] = useState(false);
  const [verifyText, setVerifyText] = useState("");
  const [counter, setCounter] = useState(0);
  const [searchId, setSearchId] = useState({});

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

    const response = new UserSearch();
    response
      .SEARCH_USER_ID(value) //
      .then((res) => {
        setSearchId(res);
        setTap({ [tapName]: true });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "회원정보가<br/>존재하지 않습니다.",
        });
        setValue({});
        setRequest(null);
        setVerifyCheck(false);
        setTap({ userId: true });
      });
  };

  const onChangeInput = (e) => {
    setValue({ ...value, [e.target.id]: e.target.value });
  };

  const onClickRequest = () => {
    if (VERIFY_REQUEST(value)) {
      setRequest(true);
      setCounter(180);
    } else {
      setRequest(false);
      setCounter(0);
      Swal.fire({
        icon: "error",
        title: "올바른 정보를<br/>입력해주세요.",
      });
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
    const response = new UserSearch();
    tab.searchPwd &&
      response
        .SEARCH_USER_PASSWORD(value) //
        .then((res) =>
          Swal.fire({
            icon: "success",
            title: "비밀번호가<br/>바뀌었습니다.",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => router.push("/user/login"))
        );
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

  const firstCondition = `${firstPwd}`.match(PWD_VALIDATION) && true;

  const secondCondition = firstPwd === secondPwd;

  const pwdCheck = firstCondition && secondCondition;

  return (
    <section className={cx("search")}>
      <MenuTab tab={tab} handleCheckTap={handleCheckTap} />
      <div className={cx("inputContainer")}>
        {tab.userId && (
          <>
            <SearchId searchInfo={searchInfo} />
            <SearchButton
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
            <SearchButton
              content="Next"
              name="searchPwd"
              activeBtn={verifyCheck}
              onClickNextBtn={handleClickNext}
            />
          </>
        )}
        {tab.searchId && (
          <>
            <ViewId searchId={searchId} />
            <SearchButton
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
            <SearchButton
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
