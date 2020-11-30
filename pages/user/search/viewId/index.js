import React, { useEffect, useState } from "react";

import classNames from "classNames/bind";

import styles from "./viewId.scss";

import { SEARCH_USER_ID } from "../../../api/searchUserInfo";

const cx = classNames.bind(styles);

const ViewId = () => {
  const [ID, setID] = useState("");

  useEffect(() => {
    SEARCH_USER_ID().then((res) => setID(res.name));
  }, []);

  return (
    <section className={cx("viewId")}>
      <span>조회하신 아이디입니다.</span>
      <div>{ID}</div>
    </section>
  );
};

export default ViewId;
