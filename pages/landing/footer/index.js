import React from "react";

import styles from "./footer.scss";
import classNames from "classNames/bind";

import { useRouter } from "next/router";

const cx = classNames.bind(styles);

const Footer = (props) => {
  const router = useRouter();

  return (
    <section className={cx("footer")}>
      <div className={cx("container")}>
        <div className={cx("top")}>
          <ul>
            <li>이용약관</li>
            <li>위치기반서비스 이용약관</li>
          </ul>
          <ul>
            <li>개인정보 취급방침</li>
          </ul>
        </div>
        <div className={cx("bottom")}>
          <div className={cx("rencar")}>{`렌카(주)`}</div>
          <div className={cx("address")}>
            <p>
              Address : 355, Achasan-ro, Gwangjin-gu, Seoul,
              <br />
              Republic of Korea
            </p>
            <div>
              <span>CEO 곽권일</span>
              <span> | </span>
              <span>사업자 등록번호 : 280-86-00274</span>
            </div>
            <div>통신판매업신고번호: 제2018-서울광진-0968호</div>
            <div>{`CS 1600-8348 (10AM-6PM)`}</div>
          </div>
          <div className={cx("copyright")}>
            Copyright@2016 rencar.All rights reserved
          </div>
          <div className={cx("linkImage")}>
            <img src={"/images/blog.png"} />
            <img src={"/images/cafe.png"} />
          </div>
        </div>
      </div>
      <button onClick={() => router.push("/landing/start")}>START</button>
    </section>
  );
};

export default Footer;
