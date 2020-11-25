import React, { useState } from "react";

import { useObserver } from "mobx-react";
import { useCookies } from "react-cookie";
import classNames from "classnames/bind";

import { useRouter } from "next/router";
import Link from "next/link";

import useStore from "../../../stores/useStore";

import styles from "./Login.scss";

const cx = classNames.bind(styles);

const login = (props) => {
  const { tokenStore } = useStore();

  const router = useRouter();

  const [cookies, setCookie, removeCookie] = useCookies(["TOKEN"]);

  const [user, setUser] = useState({ login_id: "", password: "" });

  const handleUserData = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const goToSignup = () => {
    router.push("/user/register");
  };

  const goToMain = () => {
    alert("이미 로그인이 되어있습니다.");
    router.push("/");
  };

  const handleLogin = () => {
    fetch("http://wecode-dev.rencar.co.kr/api/v1/users/login", {
      method: "POST",
      body: JSON.stringify({ login_id: "hello", password: "asdfasdf" }),
    })
      .then((response) => response.json())
      .then((result) => {
        tokenStore["userToken"] = result.Authorization;
        setCookie("TOKEN", tokenStore["userToken"], {
          path: "/",
          maxAge: 1000000,
        });
      })
      .then(() => router.push("/main"));
  };

  const loginBtnCondition = user.login_id && user.password.length >= 4;

  cookies.TOKEN && goToMain();

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
          name="login_id"
          value={user.login_id}
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

export default login;
