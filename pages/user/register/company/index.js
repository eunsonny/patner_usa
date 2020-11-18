import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import classNames from "classnames/bind";
import { useObserver } from "mobx-react";
import useStore from "../../../../stores/useStore";
import validate from  "../components/validate";

import CreateAccount from "../components/CreateAccount/CreateAccount";
import BusinessInfo from "../components/BusinessInfo/BusinessInfo";
import BasicInfo from "../components/BasicInfo/BasicInfo";
import Terms from "../components/Terms/Terms";
import styles from "./company.scss";

const cx = classNames.bind(styles);
const API = "http://wecode-dev.rencar.co.kr";

const Company = () => {
  const [createBtnIsActive, setIsActive] = useState(false);
  const [clicked, setClicked] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isIdAvailable, setIsIdAvailable] = useState(false);

  const { companyStore } = useStore();

  useEffect (() => {
    if(isSubmitting && createBtnIsActive) {
      formCompanyRegister();
    }
  }, [isSubmitting]);

  useEffect (() => {
    if(isIdAvailable){
      checkIdIsAvailable();
    }
    return setIsIdAvailable(false);
  }, [isIdAvailable])

  const totalAddress = Object.values(companyStore.address).join(", ");
  
  const getCompanyInfo = (e) => {
    const { name, value } = e.target;
    companyStore.addInfo(name, value);

    if(name === "checkPassword"){
      companyStore.addResult(validate(companyStore.registerInfo, null))
    }
  }

  // 어떤 버튼이 클릭 됐는지 확인하는 함수
  const handleClick = (e) => {
   setClicked(e.target.value);
  }

  const handleSubmit = (e) => {
    if(e) e.preventDefault();
    companyStore.addResult(validate(companyStore.registerInfo, clicked));

    if(clicked === "createCompany"){
      setIsSubmitting(true);
    }

    if(clicked === "ID중복체크") {
      setIsIdAvailable(true);
    }
  }

  const checkIdIsAvailable = () => {
    fetch(`${API}/api/v1/users/check?user_type_id=2&login_id=${companyStore.registerInfo.userId}`)
    .then((res) => res.json())
    .then((res) => {
      console.log("========== 아이디 중복 확인 =========")
      console.log(res.message);
      if(res.message === "available id"){
        companyStore.addResult({userId : "사용가능한 아이디 입니다."})
      } else if(res.description === "duplicate id") {
        companyStore.addResult({userId : "중복된 아이디 입니다."})
      }
    })
  }

  const formCompanyRegister = () => {
    fetch(`${API}/api/v1/users`, {
      method: "POST",
      body: JSON.stringify({
        login_id: companyStore.registerInfo.userId,
        password: companyStore.registerInfo.password,
        user_type_id: 2,
        user_detail_type_id: 2,
        name: companyStore.registerInfo.userName,
        contact: companyStore.registerInfo.userNumber,
        company_name: companyStore.registerInfo.companyName,
        company_contact: "239879879",
        address: totalAddress,
        rental_company_user_position_id: 1,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("========== company 회원가입 ===========");
        if (res.post === "ok") {
          Router.push("/user/login");
        }
      });
  };

  return useObserver(() => (
    <div className={cx("company")}>
      <div className={cx("header")}>
        <div></div>
        <Link href="/user/register">
          <a>
            <button>
              <img src="/images/blue_arrow_left.svg" className={cx("arrow")} />
            </button>
          </a>
        </Link>
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
          <Terms
            setIsActive={setIsActive}
          />

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
