import React, { useState, useRef, useEffect } from "react";
import Router from  "next/router";
import classNames from "classnames/bind";
import { useObserver } from "mobx-react";
import useStore from "../../../../stores/useStore";
import validate from "../components/validate";

import CreateAccount from "../components/CreateAccount/CreateAccount";
import BasicInfo from "../components/BasicInfo/BasicInfo";
import Input from "../../../../components/atoms/Input";
import styles from "./employee.scss";

const cx = classNames.bind(styles);
const API = "http://wecode-dev.rencar.co.kr";

const Employee = () => {
  const [createBtnIsActive, setIsActive] = useState(false);
  const [clicked, setClicked] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isIdAvailable, setIsIdAvailable] = useState(false);

  const { employeeStore } = useStore();

  useEffect (() => {
    if(isSubmitting) {
      formEmployeeRegister();
    }
  }, [isSubmitting]);

  useEffect (() => {
    if(isIdAvailable){
      checkIdIsAvailable();
    }
    return setIsIdAvailable(false);
  }, [isIdAvailable]);

  //employee 회원가입 page의 input 값을 store에 저장하는 함수
  const getEmployeeInfo = (e) => {
    const { name, value } = e.target;
    employeeStore.addInfo(name, value);

    if(name === "checkPassword") {
      employeeStore.addResult(validate(employeeStore.registerInfo, null))
    }
  }

  const handleClick = (e) => {
    setClicked(e.target.value);
  }

  const handleSubmit = (e) => {
    if(e) e.preventDefault();
    employeeStore.addResult(validate(employeeStore.registerInfo, clicked));

    if(clicked === "createEmployee") {
      setIsSubmitting(true);
    }

    if(clicked === "ID중복체크") {
      setIsIdAvailable(true);
    }
  }

  const checkIdIsAvailable = () => {
    fetch(`${API}/api/v1/users/check?user_type_id=2&login_id=${employeeStore.registerInfo.userId}`)
    .then((res) => res.json())
    .then((res) => {
      console.log("========== 아이디 중복 확인 =========")
      console.log(res.message);
      if(res.message === "available id"){
        employeeStore.addResult({userId : "사용가능한 아이디 입니다."})
      } else if(res.description === "duplicate id") {
        employeeStore.addResult({userId : "중복된 아이디 입니다."})
      }
    })
  }

  const formEmployeeRegister = () => {
    fetch(`${API}/api/v1/users`, {
      method: "POST",
      body: JSON.stringify({
        login_id: employeeStore.registerInfo.userId,
        password: employeeStore.registerInfo.password,
        user_type_id: 2,
        user_detail_type_id: 2,
        name: employeeStore.registerInfo.userName,
        contact: employeeStore.registerInfo.userNumber,
        rental_company_id : employeeStore.company.id,
        rental_company_user_position_id: 2,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("========== employee 회원가입 ===========");
        console.log(res.post);
        if (res.post === "ok") {
          Router.push("/user/login");
        }
      });
  };

  return useObserver (() => (
    <div className={cx("employee")}>
      <div className={cx("header")}>
        <div></div>
        <button>
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
                  onChange={getEmployeeInfo}
                  subOnClick={() => Router.push("/user/register/employee/search")}
                  placeholder="Company name *"
                />
              </div>
            </div>
          </section>
              <button
                onClick={handleClick}
                value="createEmployee"
                diabled={String(createBtnIsActive)}
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
