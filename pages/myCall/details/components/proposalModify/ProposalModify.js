import React, { useEffect, useState } from "react";
import classNames from "classNames/bind";
import styles from "./proposalModify.scss";

import DetailInput from "../../../../../components/molecules/detailInput/detailInput";

const cx = classNames.bind(styles);

const ProposalModify = ({ detailInfo }) => {
  const [offerCar1, setOfferCar1] = useState(detailInfo.offer_car1);
  const [offerCar2, setOfferCar2] = useState(detailInfo.offer_car2);
  const [offerExtra, setOfferExtra] = useState(detailInfo.offer_extra);

  useEffect(( ) => {
    setOfferCar1(detailInfo.offer_car1)
  }, [])

  const handleChange = (e) => {
    setOfferCar1(e.target.value);
  }

  console.log(detailInfo.offer_car1)
  return (
    <div className={cx("proposalModify")}>
      <DetailInput title="제안차량 1" value={offerCar1} onChange={handleChange}/>
      <DetailInput title="제안차량 2" value={offerCar2} />
      <DetailInput title="추가 요청사항" value={offerExtra}/>
    </div>
  );
};

export default ProposalModify;
