import React, { Component, Fragment, useState, useRef, useEffect } from "react";
import Head from "next/head";
import { APP_NAME } from "../../../constants/App";
import { REGISTER_USER } from "../../../constants/PageTitle";
import classNames from "classnames/bind";

import CreateAccount from "./components/CreateAccount/CreateAccount";
import BusinessInfo from "./components/BusinessInfo/BusinessInfo";
import BasicInfo from "./components/BasicInfo/BasicInfo";
import Terms from "./components/Terms/Terms";
import styles from "./RegisterUser.scss";
import useForm from "./components/useForm";

const cx = classNames.bind(styles);

const RegisterUser = (props) => {
  const [createBtnIsActive, setIsActive] = useState(true);
  const info = useRef({});
  const {
    values,
    results,
    errors,
    handleChange,
    handleSubmit,
    handleClick,
    clicked,
  } = useForm(
    // formLogin,
    info
  );

  return (
    <div className={cx("RegisterUser")}>
      <div className={cx("header")}>
        <div></div>
        <button>
          <img src="/images/blue_arrow_left.svg" className={cx("arrow")} />
        </button>
      </div>
      <div className={cx("container")}>
        <form onSubmit={(e) => handleSubmit(e)} ref={info}>
          <CreateAccount
            values={values}
            handleChange={handleChange}
            handleClick={handleClick}
            results={results}
            errors={errors}
          />
          <BasicInfo
            values={values}
            handleChange={handleChange}
            handleClick={handleClick}
            errors={errors}
            results={results}
            clicked={clicked}
          />
          <BusinessInfo values={values} handleChange={handleChange} />
          <Terms setIsActive={setIsActive} />
          <button
            diabled={createBtnIsActive.toString()}
            className={cx("createBtn", { active: createBtnIsActive })}
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterUser;
