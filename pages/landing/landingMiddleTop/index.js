import React from "react";

import styles from "./landingMiddleTop.scss";

import classNames from "classNames/bind";
import CountUp from "react-countup";

const cx = classNames.bind(styles);

const standardDate = new Date().toLocaleDateString().split(".");
const year = standardDate[0];
const date = standardDate[1];

const LandingMiddleTop = ({ position }) => {
  return (
    <section className={cx("landingMiddleTop")}>
      <p>
        이미 많은 업체가
        <br />
        함께하고 있습니다
      </p>
      <p>
        ABC form은 렌터카 업체의 업무를
        <br />좀 더 편리하고 정확하게 도와드립니다.
      </p>
      <div className={cx("countContainer")}>
        <div className={cx("counts")}>
          <div name="company" className={cx("count")}>
            <span>폼 사용 업체 수</span>
          </div>
          <div className={cx("number")}>
            {position > 100 && <CountUp start={0} end={930} duration={5} />}
            <span>개</span>
            <span>+</span>
          </div>
        </div>
        <div className={cx("counts")}>
          <div className={cx("count")}>
            <span>계약서 작성 건수</span>
          </div>
          <div className={cx("number")}>
            {position > 100 && (
              <CountUp
                start={10}
                end={940}
                decimal=","
                decimals={3}
                duration={5}
              />
            )}
            <span>개</span>
            <span>+</span>
          </div>
        </div>
        <div className={cx("counts")}>
          <div className={cx("count")}>
            <span>총 청구 금액</span>
          </div>
          <div className={cx("number")}>
            {position > 100 && <CountUp start={0} end={850} duration={5} />}
            <span>억</span>
            <span>+</span>
          </div>
        </div>
        <div className={cx("date")}>
          <span>{`${year}. ${date} 기준`}</span>
        </div>
      </div>
    </section>
  );
};

export default LandingMiddleTop;
