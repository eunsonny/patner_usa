import React, { useState } from "react";
import classNames from "classNames/bind";
import useStore from "../../../../../stores/useStore";
import styles from "./proposalInfo.scss";
import InputWrapper from "../../../../../components/molecules/inputWrapper/inputWrapper";
import { useObserver } from "mobx-react";

const cx = classNames.bind(styles);

const ProposalInfo = () => {
  const [totalByte, setTotalByte] = useState(0);

  const { proposalStore } = useStore();

  const getProposalInfo = (e) => {
    const { name, value } = e.target;
    proposalStore.addInfo(name, value);
  };

  const checkByte = (e) => {
    const { name } = e.target;
    const message = e.target.value;
    const msgLength = message.length;
    const maxByte = 45;
    let total_Byte = 0;
    let limitLength = 0;
    let limitText = "";

    for (let i = 0; i < msgLength; i++) {
      let currentByte = message.charCodeAt(i);
      currentByte > 128 ? (total_Byte += 2) : total_Byte++;

      if (total_Byte <= maxByte) {
        limitLength = i;
        proposalStore.addInfo(name, message);
        setTotalByte(total_Byte);
      } else {
        limitText = message.substr(0, limitLength);
        proposalStore.addInfo(name, limitText);
        setTotalByte(total_Byte);
      }
    }
  };

  return useObserver(() => (
    <div className={cx("proposalInfo")}>
      <span className={cx("subTitle")}>1. 제안차량</span>
      <InputWrapper
        placeholder="제안차량 1 *"
        name="firstCar"
        value={proposalStore.proposalInfo.firstCar}
        onChange={getProposalInfo}
      />
      <InputWrapper
        placeholder="제안차량 2"
        name="secondCar"
        value={proposalStore.proposalInfo.secondCar}
        onChange={getProposalInfo}
      />
      <span className={cx("subTitle")}>2. 추가 제안 사항</span>
      <textarea
        onChange={checkByte}
        name="additional"
        value={proposalStore.proposalInfo.additional}
      ></textarea>
      <span className={cx("byteCounter")}>{`(${totalByte}/45byte)`}</span>
    </div>
  ));
};

export default ProposalInfo;
