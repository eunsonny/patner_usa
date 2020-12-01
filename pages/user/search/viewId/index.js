import React, { useEffect, useState } from "react";

import classNames from "classNames/bind";

import styles from "./viewId.scss";

const cx = classNames.bind(styles);

const ViewId = ({ searchId }) => {
  console.log(searchId);
  return (
    <section className={cx("viewId")}>
      <span>조회하신 아이디입니다.</span>
      <div>{searchId.login_id}</div>
    </section>
  );
};

export default ViewId;
