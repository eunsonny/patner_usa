import React, { useEffect, useState } from "react";
import classNames from "classNames/bind";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import useStore from "../../../stores/useStore";
import Router from "next/router";
import Swal from "sweetalert2";

import RequestInfo from "./components/requestInfo/RequestInfo";
import Proposal from "./components/proposal/Proposal";
import styles from "./details.scss";
import DetailsInfo from "../../../api/detailsInfo";

const cx = classNames.bind(styles);

const Details = () => {
  const [detailInfo, setDetailInfo] = useState({});
  const [requestId, setRequestId] = useState(0);
  const [cookies] = useCookies();
  const [menuTab, setMenuTab] = useState(0);
  const [pageTab, setPageTab] = useState(0);
  const [clicked, setClicked] = useState("");

  const { proposalStore } = useStore();
  const router = useRouter();
  const { TOKEN } = cookies;
  const queryString = router.asPath;

  useEffect(() => {
    setPageTab(Number(stringToQuery(queryString).pageTab));
    setRequestId(Number(stringToQuery(queryString).id));
    proposalStore.getRequestId(Number(stringToQuery(queryString).id));
    proposalStore.getPageTab(Number(stringToQuery(queryString).pageTab));
  });

  useEffect(() => {
    const response = new DetailsInfo(TOKEN);
    response.GET_REQUEST_INFO().then((res) => {
      setDetailInfo(res.message);
      proposalStore.getOfferId(res.message.offer_id);
      proposalStore.addModifyInfo("offerCar1", res.message.offer_car1);
      proposalStore.addModifyInfo("offerCar2", res.message.offer_car2);
      proposalStore.addModifyInfo("offerExtra", res.message.offer_extra);
    });
  }, []);

  useEffect(() => {
    handleSubmit();
    return setClicked("");
  }, [clicked]);

  const stringToQuery = (query) => {
    const [_, params] = query.split("?");
    return (
      params &&
      params.split("&").reduce((acc, cur) => {
        const [k, v] = cur.split("=");
        return { ...acc, [k]: v };
      }, {})
    );
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

  const handleSubmit = () => {
    if (clicked === "제안하기") {
      const response = new DetailsInfo(TOKEN);
      response
        .POST_PROPOSAL_INFO()
        .then((res) => {
          if (res.message === "success") {
            Swal.fire({
              icon: "success",
              title: "제안이<br/>완료 되었습니다.",
              showConfirmButton: false,
              timer: 1500,
            }) //
              .then(Router.push("/myCall", "/myCall?pageTab=1"));
          }
        })
        .then(
          proposalStore.addInfo("offerCar1", null),
          proposalStore.addInfo("offerCar2", null),
          proposalStore.addInfo("offerExtra", null)
        );
    }

    if (clicked === "제안취소") {
      const response = new DetailsInfo(TOKEN);
      response.CANCEL_PROPOSAL().then((res) => {
        if (res.message === "offer canceled") {
          Swal.fire({
            icon: "success",
            title: "제안이<br/>취소 되었습니다.",
            showConfirmButton: false,
            timer: 1500,
          }) //
            .then(Router.push("/myCall", "/myCall?pageTab=1"));
        }
      });
    }

    if (clicked === "제안수정") {
      const response = new DetailsInfo(TOKEN);
      response.MODIFY_PROPOSAL().then((res) => {
        if (res.message === "success") {
          Swal.fire({
            icon: "success",
            title: "제안이<br/>수정 되었습니다.",
            showConfirmButton: false,
            timer: 1500,
          }) //
            .then(Router.push("/myCall", "/myCall?pageTab=1"));
        }
      });
    }

    if (clicked === "배차완료") {
      const response = new DetailsInfo(TOKEN);
      response.DISPATCH_CAR().then((res) => {
        if (res.message === "confirm dispatch") {
          Swal.fire({
            icon: "success",
            title: "배차가<br/>완료 되었습니다.",
            showConfirmButton: false,
            timer: 1500,
          }) //
            .then(Router.push("/myCall", "/myCall?pageTab=3"));
        }
      });
    }

    if (clicked === "배차포기") {
      const response = new DetailsInfo(TOKEN);
      response.CANCEL_DISPATCH().then((res) => {
        if (res.message === "cancel dispatch") {
          Swal.fire({
            icon: "success",
            title: "배차가<br/>취소 되었습니다.",
            showConfirmButton: false,
            timer: 1500,
          }) //
            .then(Router.push("/myCall", "/myCall?pageTab=3"));
        }
      });
    }

    if (clicked === "반납완료") {
      const response = new DetailsInfo(TOKEN);
      response.RETURN_CAR().then((res) => {
        if (res.message === "complete return") {
          Swal.fire({
            icon: "success",
            title: "반납이<br/>완료 되었습니다.",
            showConfirmButton: false,
            timer: 1500,
          }) //
            .then(Router.push("/myCall", "/myCall?pagaTab=4"));
        }
      });
    }
  };

  return (
    <div className={cx("details")}>
      <div className={cx("header")}>
        <div className={cx("headLine")}></div>
        <Link href="/myCall" as={`/myCall?pageTab=${pageTab}`}>
          <button>
            <img src="/images/blue_arrow_left.svg" className={cx("arrow")} />
          </button>
        </Link>
        {pageTab === (0 || 1) ? <span>요청상세</span> : null}
      </div>
      {showMenuTab()}
      <div className={cx("container")}>
        <RequestInfo detailInfo={detailInfo} requestId={requestId} />
        <div className={cx("middleLine")}></div>
        <Proposal
          pageTab={pageTab}
          detailInfo={detailInfo}
          setClicked={setClicked}
        />
      </div>
    </div>
  );
};

export default Details;
