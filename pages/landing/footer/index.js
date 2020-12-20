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
          <div className={cx("company")}>{`회사(주)`}</div>
          <div className={cx("address")}>
            <p>
              Address : 123, Dongil-ro, Nowon-gu, Seoul,
              <br />
              Republic of Korea
            </p>
            <div>
              <span>CEO 홍길동</span>
              <span> | </span>
              <span>사업자 등록번호 : 000-00-00000</span>
            </div>
            <div>통신판매업신고번호: 제2000-서울-0000호</div>
            <div>{`CS 1600-0000 (10AM-6PM)`}</div>
          </div>
          <div className={cx("copyright")}>
            Copyright@2016 .All rights reserved
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
