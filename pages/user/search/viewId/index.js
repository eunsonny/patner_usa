import React, { useEffect, useState } from "react";

import classNames from "classNames/bind";

import styles from "./viewId.scss";

const cx = classNames.bind(styles);

const ViewId = ({ value }) => {
  const [ID, setID] = useState("");

  // useEffect(fetch("API", { method: "POST", body: {} }));
  return (
    <section className={cx("viewId")}>
      <span>조회하신 아이디입니다.</span>
      <div>john2323</div>
    </section>
  );
};

export default ViewId;
