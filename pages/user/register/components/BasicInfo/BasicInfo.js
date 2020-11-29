import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";

import Input from "../../../../../components/atoms/Input";
import ValidationMessage from "../../../../../components/atoms/ValidationMessage/ValidationMessage";
import styles from "./BasicInfo.scss";

const cx = classNames.bind(styles);

const BasicInfo = ({ values, results, clicked, handleChange, handleClick }) => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [btnValue, setBtnValue] = useState("인증요청");

  useEffect(() => {
    if (clicked === "인증요청") {
      setBtnValue("재요청");
      setMinutes(3);
      setSeconds(0);
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

  const showCertifiNumMessage = () => {
    if (clicked === "인증요청") {
      return (
        <span className={cx("message", { valid: values.userNumber })}>
          {results.certifiRequest}
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
            placeholder="User number *"
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
        {results.certifiRequest?.includes("성공") && (
          <ValidationMessage valid="성공" message={results.certifiRequest} />
        )}
      </div>
      {results.certifiRequest?.includes("발송") && (
        <div className={cx("mainInputCon")}>
          <div className={cx("inputWithBtn")}>
            <Input
              name="certifiNum"
              value={values.certifiNum}
              placeholder="인증번호를 입력해주세요"
              onChange={handleChange}
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
                  active: String(values.certifiNum).length === 6,
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
      </div>
    </section>
  );
};

export default BasicInfo;
