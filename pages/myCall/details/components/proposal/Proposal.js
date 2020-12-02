import React, { useEffect, useState } from "react";
import classNames from "classNames/bind";
import styles from "./proposal.scss";
import useStore from "../../../../../stores/useStore";

import ProposalInfo from "../proposalInfo/proposalInfo";
import Terms from "../../../../user/register/components/Terms/Terms";
import Proposed from "../proposed/Proposed";
import MainButton from "../../../../../components/atoms/mainButton/MainButton";
import HalfButton from "../../../../../components/atoms/halfButton/HalfButton";
import { useObserver } from "mobx-react";
import { autorun } from "mobx";

const cx = classNames.bind(styles);

const Proposal = ({ pageTab }) => {
  const [isActive, setIsActive] = useState(false);
  const [isTermAllChecked, setIsTermAllChecked] = useState(false);

  const { proposalStore } = useStore();

  useEffect(
    () =>
      autorun(() => {
        proposalStore.proposalInfo.firstCar?.length > 0 && isTermAllChecked
          ? setIsActive(true)
          : setIsActive(false);
      }),
    [isTermAllChecked]
  );

  return useObserver(() => (
    <div className={cx("proposal")}>
      <span className={cx("title")}>Proposal</span>
      {pageTab === 0 ? <ProposalInfo /> : null}
      {pageTab === 0 ? (
        <Terms setIsTermAllChecked={setIsTermAllChecked} />
      ) : null}
      {pageTab === 0 ? (
        <MainButton title="제안하기" condition={isActive} />
      ) : null}
      {pageTab === 1 ? <Proposed /> : null}
      {pageTab === 1 ? (
        <HalfButton title1="제안 취소" title2="제안 수정" />
      ) : null}
      {pageTab === 2 ? <Proposed /> : null}
      {pageTab === 2 ? (
        <HalfButton title1="배차 포기" title2="배차 완료" />
      ) : null}
      {pageTab === 3 ? <Proposed /> : null}
      {pageTab === 3 ? <MainButton title="반납 완료" condition={true} /> : null}
      {pageTab === 4 ? <Proposed /> : null}
    </div>
  ));
};

export default Proposal;
