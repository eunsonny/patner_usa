import React, { useEffect, useState } from "react";
import classNames from "classNames/bind";
import styles from "./proposalModify.scss";
import useStore from "../../../../../stores/useStore";
import { useObserver } from "mobx-react";

import DetailInput from "../../../../../components/molecules/detailInput/detailInput";

const cx = classNames.bind(styles);

const ProposalModify = ({ detailInfo }) => {
  const [offerCar1, setOfferCar1] = useState(detailInfo.offer_car1);
  const [offerCar2, setOfferCar2] = useState(detailInfo.offer_car2);
  const [offerExtra, setOfferExtra] = useState(detailInfo.offer_extra);

  const { proposalStore } = useStore();

  useEffect(() => {
    setOfferCar1(detailInfo.offer_car1);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    proposalStore.addModifyInfo(name, value);
    // setOfferCar1(e.target.value);
  };

  console.log(detailInfo.offer_car1);
  return useObserver(() => (
    <div className={cx("proposalModify")}>
      <DetailInput
        title="제안차량 1"
        name="offerCar1"
        value={proposalStore.modifyInfo.offerCar1}
        onChange={handleChange}
      />
      <DetailInput
        title="제안차량 2"
        name="offerCar2"
        value={proposalStore.modifyInfo.offerCar2}
        onChange={handleChange}
      />
      <DetailInput
        title="추가 요청사항"
        name="offerExtra"
        value={proposalStore.modifyInfo.offerExtra}
        onChange={handleChange}
      />
    </div>
  ));
};

export default ProposalModify;
