import React from "react";
import classNames from "classNames/bind";
import styles from "./requestInfo.scss";

import DetailInfo from "../../../../../components/molecules/detailInfo/DetailInfo";

const cx = classNames.bind(styles);

const RequestInfo = ({ detailInfo, requestId }) => {
  return (
    <div className={cx("requestInfo")}>
      <div className={cx("title")}>
        <span>Request info.</span>
        <div className={cx("requestNum")}>
          <span>{`요청번호 ${requestId}`}</span>
        </div>
      </div>
      <DetailInfo title="고객차종" content={detailInfo.customer_car}/>
      <DetailInfo title="차량번호" content={detailInfo.customer_car_number}/>
      <DetailInfo title="고객 연락처" content={detailInfo.customer_contact}/>
      <DetailInfo title="이용지역" content={detailInfo.location}/>
      <DetailInfo title="요청일" content={detailInfo.request_time}/>
      <DetailInfo title="추가 요청사항" content={detailInfo.request_extra}/>
    </div>
  );
};

export default RequestInfo;
