import React from "react";
import classNames from "classnames/bind";
import styles from "./createAccount.scss";

import Input from "../../../../../components/atoms/Input";
import ValidationMessage from "../../../../../components/atoms/ValidationMessage/ValidationMessage";

const cx = classNames.bind(styles);

const CreateAccount = ({ values, handleChange, handleClick, results }) => {
  return (
    <section className={cx("CreateAccount")}>
      <span className={cx("title")}>Creat an account.</span>

      <div className={cx("mainInputCon")}>
        <div
          className={cx("inputWithBtn", {
            active: values.userId?.length > 5,
            valid: results?.userId?.includes("가능"),
            inValid: results?.userId?.includes("중복"),
          })}
        >
          <Input
            name={"userId"}
            value={values.userId}
            placeholder={"user ID *"}
            onChange={handleChange}
          />
          <button
            type="submit"
            className={cx({ active: values.userId?.length > 5 })}
            disabled={values.userId?.length <= 5}
            onClick={handleClick}
            value="ID중복체크"
          >
            ID 중복 체크
          </button>
        </div>
        {results.userId && (
          <ValidationMessage
            message={results.userId}
            valid={"가능"}
            inValid={"중복"}
          />
        )}
      </div>

      <div className={cx("mainInputCon")}>
        <div className={cx("basicInput")}>
          <Input
            type="password"
            name="password"
            value={values.password}
            placeholder="password * (영문 + 숫자 8자 이상)"
            onChange={handleChange}
          />
        </div>
        {results.password && (
          <ValidationMessage message={results.password} inValid="이상" />
        )}
      </div>

      <div className={cx("mainInputCon")}>
        <div className={cx("basicInput")}>
          <Input
            type="password"
            name="checkPassword"
            value={values.checkPassword}
            placeholder="password Check *"
            onChange={handleChange}
          />
        </div>
        {results.checkPassword && (
          <ValidationMessage
            message={results.checkPassword}
            valid={"일치"}
            inValid={"불일치"}
          />
        )}
      </div>
    </section>
  );
};

export default CreateAccount;
