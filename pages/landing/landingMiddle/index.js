import React from "react";

import styles from "./landingMiddle.scss";
import classNames from "classNames/bind";

const cx = classNames.bind(styles);

const LandingMiddle = ({ position }) => (
  <section className={cx("landingMiddle")}>
    <div className={cx("title")}>
      핸드폰만 있으면
      <br />
      어디서든 업무가
      <br />
      가능합니다
    </div>
    <div className={cx("phone")}>
      <img
        src={"/images/phone.png"}
        className={cx({ on: position > 1200 }, { off: position < 1200 })}
      />
    </div>
    <div className={cx("detail")}>
      <div>실시간 요청 확인</div>
      <div>
        공업사 요청을 실시간으로 확인할 수 있어
        <br />
        간편하게 제안을 할 수 있고,
        <br />
        빠른 피드백을 통해 요청자와 원활하게
        <br />
        소통할 수 있습니다.
      </div>
    </div>
  </section>
);

export default LandingMiddle;
