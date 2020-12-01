import React from "react";

import { useRouter } from "next/router";
import classNames from "classNames/bind";

import styles from "./logo.scss";

const cx = classNames.bind(styles);

const Logo = (props) => {
  const router = useRouter();

  const goToMain = () => {
    router.push("/");
  };

  return (
    <div className={cx("logo")} onClick={goToMain}>
      <img src="/images/ImsLogoBlue.svg" alt="ImsLogo" />
      <img src="/images/bluedot.svg" alt="bluedot" />
    </div>
  );
};

export default Logo;
