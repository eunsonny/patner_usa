import React from "react";
import classNames from "classNames/bind";
import styles from "./proposed.scss";

import Detailinfo from "../../../../../components/molecules/detailInfo/DetailInfo";

const cx = classNames.bind(styles);

const Proposed = () => {
  return (
    <div className={cx("proposed")}>
      <Detailinfo title="제안차량 1" content="제네시스 G90" />
      <Detailinfo title="제안차량 2" content="01가1234" />
      <Detailinfo title="추가 요청사항" content="-" />
    </div>
  );
};

export default Proposed;
