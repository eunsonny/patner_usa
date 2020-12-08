import React, { useState } from "react";
import Router from "next/router";
import classNames from "classNames/bind";
import Input from "../../../../../components/atoms/Input/Input";
import styles from "./BusinessInfo.scss";
import { useObserver } from "mobx-react";
import useStore from "../../../../../stores/useStore";

const cx = classNames.bind(styles);

const BusinessInfo = ({ values, handleChange }) => {
  const { companyStore } = useStore();
  const address = companyStore.address;
  const totalAddress = Object.values(address).join(", ");

  return useObserver(() => (
    <section className={cx("BusinessInfo")}>
      <span className={cx("title")}>Business info.</span>

      <div className={cx("mainInputCon")}>
        <div className={cx("basicInput")}>
          <Input
            name="companyName"
            value={values.companyName}
            onChange={handleChange}
            placeholder="Company name *"
          />
        </div>
      </div>
      <div className={cx("mainInputCon")}>
        <div className={cx("basicInput")}>
          <Input
            name="companyAddress"
            onChange={() => Router.push("/user/register/company/address")}
            value={totalAddress}
            subOnClick={() => Router.push("/user/register/company/address")}
            placeholder="Company Address *"
          />
        </div>
      </div>

      <div className={cx("mainInputCon")}>
        <div className={cx("basicInput")}>
          <Input
            name="intro"
            value={values.intro}
            onChange={handleChange}
            placeholder="Intro *"
          />
        </div>
      </div>
    </section>
  ));
};

export default BusinessInfo;
