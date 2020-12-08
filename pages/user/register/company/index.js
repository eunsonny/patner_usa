import React, { useState, useEffect } from "react";
import Router from "next/router";
import classNames from "classNames/bind";
import { useObserver } from "mobx-react";
import useStore from "../../../../stores/useStore";
import validate from "../components/validate";
import CompanyRegister from "../../../../api/companyRegister";

import CreateAccount from "../components/CreateAccount/CreateAccount";
import BusinessInfo from "../components/BusinessInfo/BusinessInfo";
import BasicInfo from "../components/BasicInfo/BasicInfo";
import Terms from "../components/Terms/Terms";
import styles from "./company.scss";

const cx = classNames.bind(styles);

const Company = () => {
  const [createBtnIsActive, setIsActive] = useState(false);
  const [clicked, setClicked] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isIdAvailable, setIsIdAvailable] = useState(false);
  const [isTermAllChecked, setIsTermAllChecked] = useState(false);

  const { companyStore } = useStore();

  useEffect(() => {
    validate(companyStore.registerInfo).isValid && isTermAllChecked
      ? setIsActive(true)
      : setIsActive(false);

    if (
      isSubmitting &&
      validate(companyStore.regitsterInfo).isValid &&
      isTermAllChecked
    ) {
      const response = new CompanyRegister();
      response.POST_COMPANY_REGISTER_INFO()
      .then((res) => {
        if(res.post === "ok") {
          alert("회원가입이 완료 되었습니다");
          Router.push("/user/login");
        }
      })
    }
    return setIsSubmitting(false);
  }, [isSubmitting, isTermAllChecked]);

  useEffect(() => {
    if (isIdAvailable) {
      const response = new CompanyRegister();
      response.CHECK_ID_AVAILABLE()
      .then((res) => {
        if (res.message === "available id") {
          companyStore.addResult({ userId: "사용가능한 아이디 입니다." });
        } else if (res.description === "duplicate id") {
          companyStore.addResult({ userId: "중복된 아이디 입니다." });
        }
      })
    }
    return setIsIdAvailable(false);
  }, [isIdAvailable]);

  const totalAddress = Object.values(companyStore.address).join(", ");

  // company 회원가입 page의 input 값들을 store에 저장하는 함수
  const getCompanyInfo = (e) => {
    const { name, value } = e.target;

    companyStore.addInfo(name, value);
    companyStore.addResult(
      validate(companyStore.registerInfo, name).totalResults
    );
  };

  // 어떤 버튼이 클릭 됐는지 확인하는 함수
  const handleClick = (e) => {
    setClicked(e.target.value);
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    if (clicked === "createCompany") {
      return setIsSubmitting(true);
    }

    if (clicked === "ID중복체크") {
      return setIsIdAvailable(true);
    }

    if (clicked === "인증요청" || "재요청") {
      const userNumRegex = /^\d{3}-\d{3,4}-\d{4}$/;
      userNumRegex.test(companyStore.registerInfo.userNumber)
        ? companyStore.addResult({ certifiNum: "인증번호를 발송하였습니다." })
        : companyStore.addResult({
            userNumber: "형식에 맞지 않는 번호입니다.",
          });
    }

    if (clicked === "인증번호확인") {
      checkCertifiNum();
    }
  };

  const checkCertifiNum = () => {
    fetch(`/data/certifiNum.json`)
      .then((res) => res.json())
      .then((res) => {
        if (res.message === "ok") {
          companyStore.addResult({
            userNumber: "인증에 성공하였습니다.",
            certifiNum: null,
          });
        } else {
          companyStore.addResult({ certifiNum: "인증번호가 불일치합니다." });
        }
      });
  };

  return useObserver(() => (
    <div className={cx("company")}>
      <div className={cx("header")}>
        <div></div>
        <button onClick={() => Router.push("/user/register")}>
          <img src="/images/blue_arrow_left.svg" className={cx("arrow")} />
        </button>
      </div>
      <div className={cx("container")}>
        <form name="company" onSubmit={(e) => handleSubmit(e)}>
          <CreateAccount
            values={companyStore.registerInfo}
            handleChange={getCompanyInfo}
            handleClick={handleClick}
            results={companyStore.results}
          />
          <BasicInfo
            values={companyStore.registerInfo}
            handleChange={getCompanyInfo}
            handleClick={handleClick}
            results={companyStore.results}
            clicked={clicked}
          />
          <BusinessInfo
            values={companyStore.registerInfo}
            handleChange={getCompanyInfo}
          />
          <Terms setIsTermAllChecked={setIsTermAllChecked} />

          <button
            type="submit"
            onClick={handleClick}
            value="createCompany"
            className={cx("createBtn", { active: createBtnIsActive })}
          >
            Create
          </button>
        </form>
      </div>
    </div>
  ));
};

export default Company;
