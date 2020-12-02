import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";

import RequestInfo from "./components/requestInfo/RequestInfo";
import Proposal from "./components/proposal/Proposal";
import styles from "./details.scss";
import { API } from "../../../config";

const cx = classNames.bind(styles);

const Details = () => {
  const [menuTab, setMenuTab] = useState(0);
  const [pageTab, setPageTab] = useState("");
  const queryString = "http://wecode-dev.rencar.co.kr/myCall/details?pageTab=0&id=23987"

  useEffect(() => {
    // const queryString = location.pathname;
    setPageTab(Number(stringToQuery(queryString).pageTab));
  });

  const stringToQuery = (query) => {
    const [_, params] = query.split("?"); 
    return params && params.split("&").reduce((acc, cur) => {
      const [k, v] = cur.split("="); 
      return { ...acc, [k]: v };
    }, {});
  };

  const showMenuTab = () => {
    if (pageTab === 2 || pageTab === 3 || pageTab === 4) {
      return (
        <div className={cx("tabWrapper")}>
          <div
            onClick={() => setMenuTab(0)}
            className={cx("tab", { underLine: menuTab === 0 })}
          >
            요청상세
          </div>
          <div
            onClick={() => setMenuTab(1)}
            className={cx("tab", { underLine: menuTab === 1 })}
          >
            채팅
          </div>
        </div>
      );
    }
  };

  return (
    <div className={cx("details")}>
      <div className={cx("header")}>
        <div className={cx("headLine")}></div>
        <button onClick={() => Router.push("/user/register")}>
          <img src="/images/blue_arrow_left.svg" className={cx("arrow")} />
        </button>
        {pageTab === (0 || 1) ? <span>요청상세</span> : null}
      </div>
      {showMenuTab()}
      <div className={cx("container")}>
        <RequestInfo />
        <div className={cx("middleLine")}></div>
        <Proposal pageTab={pageTab} />
      </div>
    </div>
  );
};

export default Details;
