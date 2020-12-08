import React from "react";
import classNames from "classNames/bind";
import styles from "./LandingFour.scss";

const cx = classNames.bind(styles);

const LandingFour = () => {
  return (
    <section className={cx("landingFour")}>
      <div className={cx("container")}>
        <span className={cx("title")}>INTELLIGENT</span>
        <br></br>
        <span className={cx("title")}>MOBILITY</span>
        <br></br>
        <span className={cx("title")}>SYSTEM</span>
        <br></br>

        <p className={cx("desc")}>
          당신의 사업을 더욱 쉽고 편리하게,<br></br>
          지금 바로 IMS form을 만나보세요!
        </p>
        <div className={cx("logoCon")}>
          <div className={cx("google")}>
            <img src="/images/ic_googlepaly@2x.png" />
            <span className="nanum">Google Play</span>
          </div>
          <div className={cx("appStore")}>
            <img src="/images/ic_appstore@2x.png" />
            <span>App Store</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingFour;
