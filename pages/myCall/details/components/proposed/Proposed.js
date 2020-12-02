import React from "react";
import classNames from "classNames/bind";
import styles from "./proposed.scss";

import Detailinfo from "../../../../../components/molecules/detailInfo/DetailInfo";

const cx = classNames.bind(styles);

const Proposed = ({ detailInfo }) => {
  return (
    <div className={cx("proposed")}>
      <Detailinfo title="제안차량 1" content={detailInfo.offer_car1} />
      <Detailinfo title="제안차량 2" content={detailInfo.offer_car2} />
      <Detailinfo title="추가 요청사항" content={detailInfo.offer_extra} />
    </div>
  );
};

export default Proposed;
