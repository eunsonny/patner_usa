import React, { useEffect, useState } from "react";
import classNames from "classNames/bind";
import styles from "./proposal.scss";
import useStore from "../../../../../stores/useStore";

import ProposalInfo from "../proposalInfo/ProposalInfo";
import Terms from "../../../../user/register/components/Terms/Terms";
import Proposed from "../proposed/Proposed";
import ProposalModify from "../proposalModify/ProposalModify";
import MainButton from "../../../../../components/atoms/mainButton/MainButton";
import HalfButton from "../../../../../components/atoms/halfButton/HalfButton";

import { useObserver } from "mobx-react";
import { autorun } from "mobx";

const cx = classNames.bind(styles);

const Proposal = ({ pageTab, detailInfo, setClicked }) => {
  const [isActive, setIsActive] = useState(false);
  const [isTermAllChecked, setIsTermAllChecked] = useState(false);

  const { proposalStore } = useStore();

  useEffect(
    () =>
      autorun(() => {
        proposalStore.proposalInfo.offerCar1?.length > 0 && isTermAllChecked
          ? setIsActive(true)
          : setIsActive(false);
      }),
    [isTermAllChecked]
  );

  const handleClick = (e) => {
    setClicked(e.target.value);
  };

  return useObserver(() => (
    <div className={cx("proposal")}>
      <span className={cx("title")}>Proposal</span>
      {pageTab === 0 ? <ProposalInfo /> : null}
      {pageTab === 0 ? (
        <Terms setIsTermAllChecked={setIsTermAllChecked} />
      ) : null}
      {pageTab === 0 ? (
        <MainButton
          title="제안하기"
          value="제안하기"
          onClick={handleClick}
          condition={isActive}
          disabled={!isActive}
        />
      ) : null}
      {/* {pageTab === 1 ? <Proposed detailInfo={detailInfo} /> : null} */}
      {pageTab === 1 ? <ProposalModify detailInfo={detailInfo} /> : null}
      {pageTab === 1 ? (
        <HalfButton
          title1="제안 취소"
          value1="제안취소"
          title2="제안 수정"
          value2="제안수정"
          onClick={handleClick}
        />
      ) : null}
      {pageTab === 2 ? <Proposed detailInfo={detailInfo} /> : null}
      {pageTab === 2 ? (
        <HalfButton
          title1="배차 포기"
          value1="배차포기"
          title2="배차 완료"
          value2="배차완료"
          onClick={handleClick}
        />
      ) : null}
      {pageTab === 3 ? <Proposed detailInfo={detailInfo} /> : null}
      {pageTab === 3 ? (
        <MainButton
          title="반납 완료"
          value="반납완료"
          onClick={handleClick}
          condition={true}
        />
      ) : null}
      {pageTab === 4 ? <Proposed detailInfo={detailInfo} /> : null}
    </div>
  ));
};

export default Proposal;
