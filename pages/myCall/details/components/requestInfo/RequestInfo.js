import React from 'react';
import classNames from "classnames/bind";
import styles from "./requestInfo.scss";

import DetailInfo from "../../../../../components/molecules/detailInfo/DetailInfo";

const cx = classNames.bind(styles);

const RequestInfo = () => {
  return (
    <div className={cx("requestInfo")}>
      <div className={cx("title")}>
        <span>Request info.</span>
        <div className={cx("requestNum")}>
          <span>요청번호 12323</span>
        </div>
      </div>
      <DetailInfo title="고객차종" content="제네시스 G90"/>
      <DetailInfo title="차량번호" content="01가1234"/>
      <DetailInfo title="고객 연락처" content="+82 10 8457 4004"/>
      <DetailInfo title="이용지역" content="서울특별시 강남구"/>
      <DetailInfo title="요청일" content="2020.11.05 16:40"/>
      <DetailInfo title="추가 요청사항" content="빠른 처리부탁드립니다."/>
    </div>
  );
};

export default RequestInfo;