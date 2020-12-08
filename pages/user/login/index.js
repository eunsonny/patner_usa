import React, { useEffect, useState } from "react";

import { useObserver } from "mobx-react";
import { useCookies } from "react-cookie";
import classNames from "classNames/bind";

import { useRouter } from "next/router";
import Link from "next/link";

import useStore from "../../../stores/useStore";
import UserLogin from "../../../api/login";

import styles from "./login.scss";

const cx = classNames.bind(styles);

const Login = (props) => {
  const { tokenStore } = useStore();

  const router = useRouter();

  const [cookies, setCookie, removeCookie] = useCookies(["TOKEN"]);

  const [user, setUser] = useState({ loginId: "", password: "" });

  const handleUserData = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const goToSignup = () => {
    router.push("/user/login/loginSelect");
  };

  const goToMain = () => {
    alert("이미 로그인이 되어있습니다.");
    router.push("/myCall");
  };

  const handleLogin = () => {
    const response = new UserLogin();
    response
      .USER_LOGIN(user) //
      .then((data) => {
        if ((data.message = "login success")) {
          tokenStore["userToken"] = data.Authorization;
          setCookie("TOKEN", tokenStore["userToken"], {
            path: "/",
            maxAge: 1000000,
          });
          alert("로그인이 완료되었습니다.");
          router.push("/myCall");
        }
      })
      .catch((err) => alert("아이디 비밀번호를 다시 확인해주세요"));
  };

  useEffect(
    () => cookies.TOKEN && cookies.TOKEN !== "undefined" && goToMain(),
    []
  );

  const loginBtnCondition = user.loginId && user.password.length >= 4;

  return useObserver(() => (
    <section className={cx("login")}>
      <div className={cx("title")}>
        <p>Welcome to</p>
        <span>IMS</span>
        <span>.</span>
      </div>
      <div className={cx("inputArea")}>
        <input
          placeholder="User ID"
          type="text"
          name="loginId"
          value={user.loginId}
          onChange={handleUserData}
        />
        <input
          placeholder="Password"
          type="password"
          name="password"
          value={user.password}
          onChange={handleUserData}
        />
      </div>
      <div className={cx("search")}>
        <Link href="/user/search">Forgot ID or Password?</Link>
        <img src="/images/arrow.png" alt="arrow" />
      </div>
      <div className={cx("LoginAndCreate")}>
        <button
          className={cx({ on: loginBtnCondition }, { off: !loginBtnCondition })}
          onClick={handleLogin}
          disabled={!loginBtnCondition}
        >
          Log in
        </button>
        <button onClick={goToSignup}>Create an Account</button>
      </div>
    </section>
  ));
};

export default Login;
