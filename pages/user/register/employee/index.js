import React, { useState, useEffect } from "react";
import Router from "next/router";
import classNames from "classNames/bind";
import { useObserver } from "mobx-react";
import useStore from "../../../../stores/useStore";
import validate from "../components/validate";
import EmployeeRegister from "../../../../api/employeeRegister";

import CreateAccount from "../components/CreateAccount/CreateAccount";
import BasicInfo from "../components/BasicInfo/BasicInfo";
import Input from "../../../../components/atoms/Input/Input";
import styles from "./employee.scss";

const cx = classNames.bind(styles);

const Employee = () => {
  const [createBtnIsActive, setIsActive] = useState(true);
  const [clicked, setClicked] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isIdAvailable, setIsIdAvailable] = useState(false);

  const { employeeStore } = useStore();

  useEffect(() => {
    if (isSubmitting && validate(employeeStore.registerInfo).isValid) {
      const response = new EmployeeRegister();
      response.POST_EMPLOYEE_REGISTER_INFO()
      .then((res) => {
        if(res.post === "ok") {
          alert("회원가입이 완료 되었습니다");
          Router.push("/user/login");
        }
      })
    }
    return setIsSubmitting(false);
  }, [isSubmitting]);

  useEffect(() => {
    if (isIdAvailable) {
      const response = new EmployeeRegister();
      response.CHECK_ID_AVAILABLE()
      .then((res) => {
        if (res.message === "available id") {
          employeeStore.addResult({ userId: "사용가능한 아이디 입니다." });
        } else if (res.description === "duplicate id") {
          employeeStore.addResult({ userId: "중복된 아이디 입니다." });
        }
      })
    }
    return setIsIdAvailable(false);
  }, [isIdAvailable]);

  //employee 회원가입 page의 input 값을 store에 저장하는 함수
  const getEmployeeInfo = (e) => {
    const { name, value } = e.target;
    employeeStore.addInfo(name, value);
    employeeStore.addResult(
      validate(employeeStore.registerInfo, name).totalResults
    );
  };

  // 어떤 버튼이 클릭 됐는지 확인하는 함수
  const handleClick = (e) => {
    setClicked(e.target.value);
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    if (clicked === "createEmployee") {
      return setIsSubmitting(true);
    }

    if (clicked === "ID중복체크") {
      return setIsIdAvailable(true);
    }

    if (clicked === "인증요청" || "재요청") {
      const userNumRegex = /^\d{3}-\d{3,4}-\d{4}$/;
      userNumRegex.test(employeeStore.registerInfo.userNumber)
        ? employeeStore.addResult({ certifiNum: "인증번호를 발송하였습니다." })
        : employeeStore.addResult({
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
          employeeStore.addResult({
            userNumber: "인증에 성공하였습니다.",
            certifiNum: null,
          });
        } else {
          employeeStore.addResult({ certifiNum: "인증번호가 불일치합니다." });
        }
      });
  };

  return useObserver(() => (
    <div className={cx("employee")}>
      <div className={cx("header")}>
        <div></div>
        <button onClick={() => Router.push("/user/register")}>
          <img src="/images/blue_arrow_left.svg" className={cx("arrow")} />
        </button>
      </div>
      <div className={cx("container")}>
        <form name="employee" onSubmit={(e) => handleSubmit(e)}>
          <CreateAccount
            values={employeeStore.registerInfo}
            handleChange={getEmployeeInfo}
            handleClick={handleClick}
            results={employeeStore.results}
          />
          <BasicInfo
            values={employeeStore.registerInfo}
            handleChange={getEmployeeInfo}
            handleClick={handleClick}
            results={employeeStore.results}
            clicked={clicked}
          />
          <section className={cx("businessInfo")}>
            <span className={cx("title")}>Business info.</span>

            <div className={cx("mainInputCon")}>
              <div className={cx("basicInput")}>
                <Input
                  name="companyName"
                  value={employeeStore.company.companyName}
                  onChange={() => Router.push("/user/register/employee/search")}
                  subOnClick={() =>
                    Router.push("/user/register/employee/search")
                  }
                  placeholder="Company name *"
                />
              </div>
            </div>
          </section>
          <button
            onClick={handleClick}
            value="createEmployee"
            className={cx("createBtn", { active: createBtnIsActive })}
          >
            Create
          </button>
        </form>
      </div>
    </div>
  ));
};

export default Employee;
