import React from "react";
import classNames from "classNames/bind";
import styles from "./start.scss";
import Router from "next/router";

const cx = classNames.bind(styles);

const Start = (props) => {
  return (
    <div className={cx("start")}>
      <div className={cx("container")}>
        <span className={cx("firstLine")}>
          Innovation rental car computing systems,
        </span>
        <h5>Welcome to ABC.</h5>

        <p>
          If you're new to ABC form, Please make it <br></br>
          your company account. <br></br>
          Regardless of the representative/employee, <br></br>
          the first subscribe has Manager access.
        </p>
        <div
          className={cx("letsStart")}
          onClick={() => Router.push("/user/register")}
        >
          <span>Let's Start!</span>
          <img alt="rightArrow" src="/images/right_arrow.png" />
        </div>
        <p className={cx("bottomP")}>
          If you are already using ABC form, <br></br>
          Please log in to the company account and<br></br>
          add the user in the employee register of<br></br>
          the employee management.{" "}
          <span
            className={cx("login")}
            onClick={() => Router.push("/user/login")}
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );
};

export default Start;
