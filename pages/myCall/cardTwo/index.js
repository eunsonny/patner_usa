import React from "react";

import classNames from "classNames/bind";
import Link from "next/link";

import styles from "./cardTwo.scss";

const cx = classNames.bind(styles);

const CardTwo = ({ menuOnOff, info, menuNum, id }) => {
  return (
    <Link href={"/details"} as={`myCall/details?pageTab=${menuNum}&id=${id}`}>
      <div className={cx("cardTwo")}>
        <div className={cx("container")}>
          <div className={cx("request")}>
            <span className={cx("requestType")}>공업사 요청</span>
            <span
              className={cx("requestNum")}
            >{`요청번호 ${info.request_id}`}</span>
          </div>
          <div className={cx("info")}>
            <div className={cx("carType")}>
              <span>고객차종</span>
              <span>{info.customer_car}</span>
            </div>
            {!menuOnOff[4] && (
              <div className={cx("addInfo")}>
                <span>차량번호</span>
                <span>{info.customer_car_number}</span>
              </div>
            )}
            <div className={cx("addInfo")}>
              <span>요청일</span>
              <span>{timeCacl(info.request_time)}</span>
            </div>
            {!menuOnOff[2] && (
              <div className={cx("addInfo")}>
                <span>배차일</span>
                <span>{timeCacl(info.dispatch_time)}</span>
              </div>
            )}
            {menuOnOff[4] && (
              <div className={cx("addInfo")}>
                <span>반납일</span>
                <span>{timeCacl(info.return_time)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardTwo;

function timeCacl(time) {
  if (time !== "None") {
    const timeArr = time.split(" ");

    const YMD = timeArr[0];
    const T = timeArr[1].split(".")[0];

    return `${YMD} ${T}`;
  } else {
    return ``;
  }
}
