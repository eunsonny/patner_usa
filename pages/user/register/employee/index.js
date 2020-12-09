import React, { useState, useEffect } from "react";
import Router from "next/router";
import classNames from "classNames/bind";
import { useObserver } from "mobx-react";
import useStore from "../../../../stores/useStore";
import validate from "../components/validate";
import EmployeeRegister from "../../../../api/employeeRegister";
import { autorun } from "mobx";
import Swal from "sweetalert2";

import CreateAccount from "../components/CreateAccount/CreateAccount";
import BasicInfo from "../components/BasicInfo/BasicInfo";
import Input from "../../../../components/atoms/Input/Input";
import styles from "./employee.scss";

const cx = classNames.bind(styles);

const Employee = () => {
  const [createBtnIsActive, setIsActive] = useState(false);
  const [clicked, setClicked] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isIdAvailable, setIsIdAvailable] = useState(false);
  const [userId, setUserId] = useState("");
  const [isIdCheckBtn, setIsIdCheckBtn] = useState(false);

  const { employeeStore } = useStore();

  useEffect(() => {
    const idReg = /[\s]/g;
    userId.length > 4 && !idReg.test(userId)
      ? setIsIdCheckBtn(true)
      : setIsIdCheckBtn(false);
  }, [userId]);

  useEffect(() => {
    autorun(() => {
      console.log(validate(employeeStore.registerInfo).isValid);
      validate(employeeStore.registerInfo).isValid &&
      Object.keys(employeeStore.registerInfo).length === 7 &&
      Object.values(employeeStore.registerInfo).every((value) => value) &&
      employeeStore.company.companyName
        ? setIsActive(true)
        : setIsActive(false);

      if (isSubmitting && validate(employeeStore.registerInfo).isValid) {
        const response = new EmployeeRegister();
        response.POST_EMPLOYEE_REGISTER_INFO().then((res) => {
          if (res.post === "ok") {
            Swal.fire({
              icon: "success",
              title: "회원가입이<br/>완료 되었습니다.",
              showConfirmButton: false,
              timer: 1500,
            }) //
              .then(() => Router.push("/user/login"));
          }
        });
      }
      return setIsSubmitting(false);
    });
  }, [isSubmitting]);

  useEffect(() => {
    if (isIdAvailable) {
      const response = new EmployeeRegister();
      response.CHECK_ID_AVAILABLE().then((res) => {
        if (res.message === "available id") {
          employeeStore.addResult({ userId: "사용가능한 아이디 입니다." });
        } else if (res.description === "duplicate id") {
          employeeStore.addResult({ userId: "중복된 아이디 입니다." });
        }
      });
    }
    return setIsIdAvailable(false);
  }, [isIdAvailable]);

  //employee 회원가입 page의 input 값을 store에 저장하는 함수
  const getEmployeeInfo = (e) => {
    const { name, value } = e.target;
    const idReg = /[\s]/g;

    employeeStore.addInfo(name, value);
    employeeStore.addResult(
      validate(employeeStore.registerInfo, name).totalResults
    );

    if (value === "") {
      employeeStore.addResult({ [name]: "" });
    }

    if (name === "userId") {
      setUserId(value);
    }

    if (name === "userId" && employeeStore.results.userId) {
      employeeStore.addResult({ userId: "중복 확인이 필요합니다." });
    }

    if (name === "userId" && idReg.test(value)) {
      employeeStore.addResult({ userId: "공백은 사용할 수 없습니다." });
    }

    if (
      name === "password" &&
      employeeStore.registerInfo.checkPassword &&
      value !== employeeStore.registerInfo.checkPassword
    ) {
      employeeStore.addResult({ checkPassword: "비밀번호가 불일치 합니다." });
    } else if (
      name === "password" &&
      employeeStore.registerInfo.checkPassword &&
      value === employeeStore.registerInfo.checkPassword
    ) {
      employeeStore.addResult({ checkPassword: "비밀번호가 일치합니다." });
    }
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

  const clearInfo = () => {
    employeeStore.addInfo("userId", null);
    employeeStore.addInfo("password", null);
    employeeStore.addInfo("checkPassword", null);
    employeeStore.addInfo("userName", null);
    employeeStore.addInfo("userNumber", null);
    employeeStore.addInfo("position", null);
    employeeStore.addInfo("email", null);
    employeeStore.addInfo("companyName", null);
    employeeStore.addInfo("intro", null);
    employeeStore.addCompany("companyName", null);
    employeeStore.addCompany("id", null);
    employeeStore.addResult({ userId: null });
    employeeStore.addResult({ password: null });
    employeeStore.addResult({ checkPassword: null });
    employeeStore.addResult({ userName: null });
    employeeStore.addResult({ userNumber: null });
    employeeStore.addResult({ email: null });
  };

  const handlePrevBtn = () => {
    Router.push("/user/register");
    clearInfo();
  };

  return useObserver(() => (
    <div className={cx("employee")}>
      <div className={cx("header")}>
        <div></div>
        <button onClick={handlePrevBtn}>
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
            isIdCheckBtn={isIdCheckBtn}
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
