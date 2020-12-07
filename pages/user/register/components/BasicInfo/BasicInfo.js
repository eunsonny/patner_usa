import React, { useState, useEffect } from "react";
import classNames from "classNames/bind";

import Input from "../../../../../components/atoms/Input/Input";
import ValidationMessage from "../../../../../components/atoms/ValidationMessage/ValidationMessage";
import styles from "./BasicInfo.scss";

const cx = classNames.bind(styles);

const BasicInfo = ({ values, results, clicked, handleChange, handleClick }) => {
  const [minutes, setMinutes] = useState(3);
  const [seconds, setSeconds] = useState(0);
  const [btnValue, setBtnValue] = useState("인증요청");
  const [certifiNum, setCertifiNum] = useState("");

  useEffect(() => {
    const userNumRegex = /^\d{3}-\d{3,4}-\d{4}$/;
    if (
      (clicked === "인증요청" || "재요청") &&
      userNumRegex.test(values.userNumber)
    ) {
      setBtnValue("재요청");
      setMinutes(3);
      setSeconds(0);
    }

    if (clicked === "인증번호확인") {
      setMinutes(0);
      setSeconds(0);
      setCertifiNum("");
    }
  }, [clicked]);

  useEffect(() => {
    const countDown = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(countDown);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(countDown);
  }, [minutes, seconds]);

  const handleCertifiNum = (e) => {
    setCertifiNum(e.target.value);
  };

  const showCertifiNumMessage = () => {
    if (clicked === "인증요청" || "재요청") {
      return (
        <span className={cx("message", { valid: values.userNumber })}>
          {results.certifiNum}
        </span>
      );
    } else if (clicked === "인증번호확인") {
      return (
        <ValidationMessage
          message={results.certifiNum}
          valid="성공"
          inValid="불일치"
        />
      );
    }
  };

  return (
    <section className={cx("BasicInfo")}>
      <span className={cx("title")}>Basic info.</span>

      <div className={cx("mainInputCon")}>
        <div className={cx("basicInput")}>
          <Input
            name="userName"
            value={values.userName}
            onChange={handleChange}
            placeholder="user name *"
          />
        </div>
      </div>

      <div className={cx("mainInputCon")}>
        <div className={cx("inputWithBtn")}>
          <Input
            name="userNumber"
            value={values.userNumber}
            placeholder="User number * (010-1234-5678)"
            onChange={handleChange}
          />
          <button
            type="submit"
            disabled={String(values.userNumber).length < 9}
            onClick={handleClick}
            value={btnValue}
            className={cx({
              active: String(values.userNumber).length > 9,
            })}
          >
            {btnValue}
          </button>
        </div>
        {results.userNumber && (
          <ValidationMessage
            message={results.userNumber}
            valid="성공"
            inValid="않는"
          />
        )}
      </div>
      {results.certifiNum?.includes("발송") && (
        <div className={cx("mainInputCon")}>
          <div className={cx("inputWithBtn")}>
            <Input
              name="certifiNum"
              value={certifiNum}
              placeholder="인증번호를 입력해주세요"
              onChange={handleCertifiNum}
            />
            <div>
              <span className={cx("timer")}>
                {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
              </span>
              <button
                type="submit"
                onClick={handleClick}
                value="인증번호확인"
                className={cx({
                  active: String(certifiNum).length >= 6,
                })}
              >
                확인
              </button>
            </div>
          </div>
          {showCertifiNumMessage()}
        </div>
      )}

      <div className={cx("mainInputCon")}>
        <div className={cx("basicInput")}>
          <Input
            name="position"
            value={values.position}
            onChange={handleChange}
            placeholder="position *"
          />
        </div>
      </div>

      <div className={cx("mainInputCon")}>
        <div className={cx("basicInput")}>
          <Input
            name="email"
            value={values.email}
            placeholder="e-mail * (abc@xxx.com)"
            onChange={handleChange}
          />
        </div>
        {results.email && (
          <ValidationMessage message={results.email} inValid="않는" />
        )}
      </div>
    </section>
  );
};

export default BasicInfo;
