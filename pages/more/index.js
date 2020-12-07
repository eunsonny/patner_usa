import React, { useEffect, useState } from "react";
import Logo from "../../components/atoms/logo";
import Top from "../../components/atoms/top";

import classNames from "classNames/bind";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";

import Bottom from "../../components/atoms/bottom";
import LogoutModal from "./logoutModal/logoutModal";

import styles from "./more.scss";

const cx = classNames.bind(styles);

const More = (props) => {
  const router = useRouter();

  const [isOpenLogout, setIsOpenLogout] = useState(false);

  const [cookies, setCookie, removeCookie] = useCookies(["TOKEN"]);

  const openLogoutModal = () => {
    setIsOpenLogout(!isOpenLogout);
  };

  const handleLogout = (e) => {
    router.push("/");
    e.target.dataset.name = "okay" && removeCookie("TOKEN");
  };

  useEffect(() => {
    const { TOKEN } = cookies;
    if (!TOKEN || TOKEN === "undefined") {
      alert("로그인이 되어있지 않습니다.");
      router.push("/user/login");
    }
  }, []);

  return (
    <>
      <section className={cx("more")}>
        <Top />
        <Logo />
        <div className={cx("userId")}>
          <span className={cx("mainTitle")}>imsUSA2020</span>
          <div className={cx("userInfo")}>
            <span>Heo Deok Hyeong</span>
            <button onClick={() => router.push("/")}>내정보</button>
          </div>
        </div>
        <ul className={cx("lists")}>
          <li onClick={() => router.push("/more/employeeLists")}>
            직원 리스트
          </li>
          <li onClick={openLogoutModal}>로그아웃</li>
        </ul>
        <Bottom />
        {isOpenLogout && (
          <div
            className={cx("modalBackground")}
            onClick={openLogoutModal}
          ></div>
        )}
        {isOpenLogout && (
          <LogoutModal
            onClickLogout={handleLogout}
            openLogoutModal={openLogoutModal}
          />
        )}
      </section>
    </>
  );
};

export default More;
