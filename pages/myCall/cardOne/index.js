import React from "react";

import classNames from "classNames/bind";
import Link from "next/link";

import styles from "./cardOne.scss";

const cx = classNames.bind(styles);

const CardOne = ({ info, menuNum, id }) => {
  return (
    <Link href="/details" as={`myCall/details?pageTab=${menuNum}&id=${id}`}>
      <div className={cx("cardOne")}>
        <div className={cx("left")}>
          <span>제안</span>
          <span>{info.suggest}</span>
        </div>
        <div className={cx("right")}>
          <div className={cx("optionLists")}>
            <span>공업사 요청</span>
            {info.option && <span className={cx("option")}>수수료 무료</span>}
          </div>
          <div className={cx("car")}>
            <span>고객차종</span>
            <span>{info.car}</span>
          </div>
          <div className={cx("addInfo")}>
            <span>차량번호</span>
            <span>{info.number}</span>
          </div>
          <div className={cx("addInfo")}>
            <span>요청일</span>
            <span>{info.date}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardOne;
