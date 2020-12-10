import React, { useEffect, useState } from "react";

import styles from "./myCall.scss";

import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import classNames from "classNames/bind";

import Top from "../../components/atoms/top/top";
import Bottom from "../../components/atoms/bottom/bottom";
import Logo from "../../components/atoms/logo/logo";

const cx = classNames.bind(styles);

const Alarm = (props) => {
  return (
    <section className={cx("alarm")}>
      <div className={cx("topContainer")}>
        <Top />
        <Logo />
      </div>
      <div className={cx("container")}>
        <div className={cx("cards")}>
          <img src="/images/alarmImg.png" />
          <img src="/images/alarmText.png" />
        </div>
      </div>
      <Bottom />
    </section>
  );
};

export default Alarm;
