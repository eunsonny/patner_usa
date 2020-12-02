import React from "react";

import classNames from "classNames/bind";

import styles from "./cardTwo.scss";

const cx = classNames.bind(styles);

const CardTwo = ({ menuOnOff, info }) => {
  return (
    <div className={cx("cardTwo")}>
      <div className={cx("container")}>
        <div className={cx("request")}>
          <span className={cx("requestType")}>공업사 요청</span>
          <span className={cx("requestNum")}>{`요청번호 11940`}</span>
        </div>
        <div className={cx("info")}>
          <div className={cx("carType")}>
            <span>고객차종</span>
            <span>{info.car}</span>
          </div>
          {!menuOnOff[4] && (
            <div className={cx("addInfo")}>
              <span>차량번호</span>
              <span>{info.number}</span>
            </div>
          )}
          <div className={cx("addInfo")}>
            <span>요청일</span>
            <span>{info.date}</span>
          </div>
          {!menuOnOff[2] && (
            <div className={cx("addInfo")}>
              <span>배차일</span>
              <span>{info.useDate}</span>
            </div>
          )}
          {menuOnOff[4] && (
            <div className={cx("addInfo")}>
              <span>반납일</span>
              <span>{info.complete}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardTwo;
