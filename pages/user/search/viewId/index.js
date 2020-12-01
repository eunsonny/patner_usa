import React, { useEffect, useState } from "react";

import classNames from "classNames/bind";

import styles from "./viewId.scss";
import UserSearch from "../../../api/searchUserInfo";

const cx = classNames.bind(styles);

const ViewId = ({ value }) => {
  const [ID, setID] = useState("");

  useEffect(() => {
    const response = new UserSearch();
    response
      .SEARCH_USER_ID(value) //
      .then((res) => console.log("결과 =>", res));
  }, []);

  return (
    <section className={cx("viewId")}>
      <span>조회하신 아이디입니다.</span>
      <div>{ID}</div>
    </section>
  );
};

export default ViewId;
