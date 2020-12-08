import React from "react";

import styles from "./landingTop.scss";
import classNames from "classNames/bind";

import { useRouter } from "next/router";

const cx = classNames.bind(styles);

const LandingTop = (props) => {
  const router = useRouter();

  return (
    <main className={cx("landingTop")}>
      <header>
        <img src="/images/ImsLogo.png" />
      </header>
      <div className={cx("mainTextContainer")}>
        <img className={cx("mainTextOne")} src="/images/landingText1.png" />
        <img className={cx("divBar")} src="/images/rectangle.png" />
        <img className={cx("mainTextTwo")} src="/images/landingText2.png" />
      </div>
      <div className={cx("buttonContainer")}>
        <button onClick={() => router.push("/landing/start")}>START</button>
      </div>
    </main>
  );
};

export default LandingTop;
