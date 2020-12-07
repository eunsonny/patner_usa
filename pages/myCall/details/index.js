import React, { useEffect, useState } from "react";
import classNames from "classNames/bind";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import useStore from "../../../stores/useStore";
import Router from "next/router";

import RequestInfo from "./components/requestInfo/RequestInfo";
import Proposal from "./components/proposal/Proposal";
import styles from "./details.scss";
import { API } from "../../../config";
import Axios from "axios";
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
    // getData();
    // getDetailsInfo();
    // setPageTab(Number(stringToQuery(queryString).pageTab));

    const response = new DetailsInfo(TOKEN);
    response
      .GET_REQUEST_INFO()
      .then(
        (res) => {setDetailInfo(res.message);
        proposalStore.getOfferId(res.message.offer_id)})
  }, []);

  useEffect(() => {
    handleSubmit();
    return setClicked("");
  }, [clicked]);

  // const getData = () => {
  //   Axios.get(`/api/details/${stringToQuery(queryString).id}`).then((res) => {
  //     if (res.status === 200 && res.data.message) {
  //       setDetailInfo(res.data.message);
  //     }
  //   });
  // };

  // const getDetailsInfo = () => {
  //   fetch(`${API}/api/v1/requests/19/offer`, {
  //     headers: {
  //       Authorization:
  //         "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxNDgsInBvc2l0aW9uX2lkIjoyLCJwb3NpdGlvbiI6ImVtcGxveWVlIiwiZGV0YWlsX3R5cGVfaWQiOjJ9.Yjt8Bbbmfd3-nGkYaAKQrE_YNJYFSn4kySHCH_9jE3w",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       console.log("======== 데이터 받아오기 =======");
  //       console.log(res.message);
  //       setDetailInfo(res.message);
  //       proposalStore.getOfferId(res.message.offer_id);
  //     });
  // };

  // const postProposalInfo = () => {
  //   fetch(`${API}/api/v1/offers`, {
  //     method: "POST",
  //     headers: {
  //       Authorization:
  //       "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo1LCJwb3NpdGlvbl9pZCI6MiwicG9zaXRpb24iOiJlbXBsb3llZSIsImRldGFpbF90eXBlX2lkIjoyfQ.z0nA6GvaxAekKPBhSrbZbxJTyj1uQ1EgAE9LnkchBmE"
  //     },
  //     body: JSON.stringify({
  //       // request_id: detailInfo.request_id,
  //       request_id: 19,
  //       offer_car1: proposalStore.proposalInfo.offerCar1,
  //       offer_car2: proposalStore.proposalInfo.offerCar2,
  //       offer_extra: proposalStore.proposalInfo.offerExtra,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       console.log("======== 제안정보 전송========");
  //       if (res.message === "success") {
  //         console.log("성공");
  //       }
  //     });
  // };

  const cancelProposal = () => {
    fetch(`${API}/api/v1/offers/${detailInfo.offer_id}/cancel`, {
      method: "POST",
      headers: {
        Authorization:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo1LCJwb3NpdGlvbl9pZCI6MiwicG9zaXRpb24iOiJlbXBsb3llZSIsImRldGFpbF90eXBlX2lkIjoyfQ.z0nA6GvaxAekKPBhSrbZbxJTyj1uQ1EgAE9LnkchBmE",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("========= 제안 취소 =========");
        if (res.message === "offer canceled") {
          alert("제안이 취소되었습니다.");
        }
      });
  };

  const dispatchCar = () => {
    fetch(`${API}/api/v1/offers/${detailInfo.offer_id}/return`, {
      method: "POST",
      headers: {
        Authorization:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxNDYsInBvc2l0aW9uX2lkIjoxLCJwb3NpdGlvbiI6ImVtcGxveWVyIn0.JrKYXeAHDmJScisiMKYzFTM1KVgYBb435VL_zAXb6kM",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("========= 배차 완료 =========");
        if (res.message === "confirm dispatch") {
          alert("배차가 완료 되었습니다.");
        }
      });
  };

  const returnCar = () => {
    fetch(`${API}/api/v1/offers/${detailInfo.offer_id}/return`, {
      method: "POST",
      headers: {
        Authorization:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxNDYsInBvc2l0aW9uX2lkIjoxLCJwb3NpdGlvbiI6ImVtcGxveWVyIn0.JrKYXeAHDmJScisiMKYzFTM1KVgYBb435VL_zAXb6kM",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("========= 차량 반납 =========");
        if (res.message === "complete return") {
          alert("차량반납이 완료되었습니다.");
        }
      });
  };

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
      // postProposalInfo();
      const response = new DetailsInfo(TOKEN);
      response
        .POST_PROPOSAL_INFO()
        .then((res) => {
          if (res.message === "success") {
            alert("제안이 완료 되었습니다.");
          }
        })
        .then(Router.push("/myCall"));
    }

    if (clicked === "제안취소") {
      // cancelProposal();
      const response = new DetailsInfo(TOKEN);
      response.CANCEL_PROPOSAL();
    }

    if (clicked === "제안수정") {
      console.log("ㅇㅇㅇ");
    }

    if (clicked === "배차완료") {
      dispatchCar();
    }

    if (clicked === "반납완료") {
      returnCar();
    }
  };

  console.log(proposalStore.offerId);
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
