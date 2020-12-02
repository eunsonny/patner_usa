import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./proposalInfo.scss";

import useStore from "../../../../../stores/useStore";
import { useObserver } from "mobx-react";
import InputWrapper from "../../../../../components/molecules/inputWrapper/InputWrapper";

const cx = classNames.bind(styles);

const ProposalInfo = () => {
  const [textByte, setTextByte] = useState(0);

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
    let totalByte = 0;
    let currentLength = 0;
    let newMessage = "";
    console.log(msgLength === 0);

    for (let i = 0; i < msgLength; i++) {
      let currentByte = message.charCodeAt(i);
      currentByte > 128 ? (totalByte += 2) : totalByte++;

      if (totalByte <= maxByte) {
        currentLength = i;
      }
    }
    proposalStore.addInfo(name, message);
    setTextByte(totalByte);

    if (totalByte > maxByte) {
      newMessage = message.substr(0, currentLength);
      proposalStore.addInfo(name, newMessage);
    }
  };

  return useObserver(() => (
    <div className={cx("proposalInfo")}>
      <span className={cx("subTitle")}>1. 제안차량</span>
      <InputWrapper
        placeholder="제안차량 1 *"
        name="offerCar1"
        value={proposalStore.proposalInfo.offerCar1}
        onChange={getProposalInfo}
      />
      <InputWrapper
        placeholder="제안차량 2 *"
        name="offerCar2"
        value={proposalStore.proposalInfo.offerCar2}
        onChange={getProposalInfo}
      />
      <span className={cx("subTitle")}>2. 추가 제안 사항</span>
      <textarea
        // onKeyUp ={(e) => checkByte(e)}
        onChange={checkByte}
        name="offerExtra"
        value={proposalStore.proposalInfo.offerExtra}
      ></textarea>
      <span className={cx("byteCounter")}>{`(${textByte}/45byte)`}</span>
    </div>
  ));
};

export default ProposalInfo;
