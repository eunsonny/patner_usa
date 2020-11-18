import React, { useState } from "react";
import Router from "next/Router";
import classNames from "classnames/bind";
import { useObserver } from "mobx-react";
import useStore from "../../../../stores/useStore";
import styles from "./address.scss";

import InputWrapper from "../../../../components/molecules/inputWrapper/inputWrapper";

const cx = classNames.bind(styles);

const Address = () => {
  const { companyStore } = useStore();

  const getAddress = (e) => {
    const { name, value } = e.target;
    companyStore.getAddress(name, value);
  }

  return useObserver (() => (
    <div className={cx("companyAddress")}>
      <div className={cx("header")}>
        <div className={cx("headerBox")}></div>
        <div>
          <button onClick={() => Router.push("/user/register/company")}>
            <img src="/images/blue_arrow_left.svg" className={cx("arrow")} />
          </button>
          <span>Company Address</span>
        </div>
      </div>
      <div className={cx("container")}>
        <div className={cx("content")}>
          <InputWrapper
            name="address1"
            value={companyStore.address.address1}
            onChange={getAddress}
            placeholder="Address 1 (street and number, P.O, box, c/o.)"
          />
          <InputWrapper
            name="address2"
            value={companyStore.address.address2}
            onChange={getAddress}
            placeholder="Address 2 (APT, suite, unit, building, floor, etc.)"
          />
          <InputWrapper
            name="city"
            value={companyStore.address.city}
            onChange={getAddress}
            placeholder="City"
          />
          <InputWrapper
            name="state"
            value={companyStore.address.state}
            onChange={getAddress}
            placeholder="State"
          />
          <InputWrapper
            name="zipCode"
            value={companyStore.address.zipCode}
            onChange={getAddress}
            placeholder="Zip Code / Postal Code"
          />
        </div>
        <button
          onClick={() => Router.push("/user/register/company")}
          className={cx("confirmBtn")}
        >
          Confirm
        </button>
      </div>
    </div>
  ));
};

export default Address;
