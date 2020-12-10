import React, { useEffect, useState } from "react";

import styles from "./more.scss";

import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import classNames from "classNames/bind";
import Swal from "sweetalert2";

import Top from "../../components/atoms/top/top";
import Bottom from "../../components/atoms/bottom/bottom";
import Logo from "../../components/atoms/logo/logo";

import LogoutModal from "./logoutModal/logoutModal";

import useStore from "../../stores/useStore";
import UserInfo from "../../api/userInfo";

const cx = classNames.bind(styles);

const More = (props) => {
  const { tokenStore } = useStore();

  const router = useRouter();

  const [cookies, setCookie, removeCookie] = useCookies(["TOKEN"]);

  const { TOKEN } = cookies;

  const [isOpenLogout, setIsOpenLogout] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const openLogoutModal = () => {
    setIsOpenLogout(!isOpenLogout);
  };

  const handleLogout = (e) => {
    e.target.dataset.name =
      "okay" &&
      setCookie("TOKEN", tokenStore["userToken"], {
        path: "/",
        maxAge: 0,
      });
    Swal.fire({
      icon: "success",
      title: "로그아웃이<br/>완료 되었습니다.",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => router.push("/"));
  };

  useEffect(() => {
    const response = new UserInfo(TOKEN);

    response
      .GET_USER_INFO() //
      .then((res) => setUserInfo(res));

    if (!TOKEN || TOKEN === "undefined") {
      Swal.fire({
        icon: "error",
        title: "로그인<br/>되어있지 않습니다.",
      }); //
      then(() => router.push("/user/login"));
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
            <span>{userInfo?.name}</span>
            <button onClick={() => router.push("/more/myInfo")}>내정보</button>
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
