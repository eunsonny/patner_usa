import React, { useEffect, useState } from "react";

import styles from "./myCall.scss";

import classNames from "classNames/bind";

import Top from "../../components/atoms/top";
import Logo from "./logo";
import MenuTab from "./menuTab";
import CardOne from "./cardOne";
import CardTwo from "./cardTwo";

import Bottom from "../../components/atoms/bottom";
import Link from "next/link";

const cx = classNames.bind(styles);

const MyCall = (props) => {
  const [menuOnOff, setMenu] = useState({ 0: true });
  const [callData, setCallData] = useState([]);

  const handleMenu = (e) => {
    window.scrollTo(0, 0);
    setMenu({ [e.currentTarget.id]: true });
    fetch(
      `http://localhost:3000/data/data${Number(e.currentTarget.id) + 1}.json`
    )
      .then((res) => res.json())
      .then((res) => setCallData(res.data));
  };

  useEffect(() => {
    fetch("http://localhost:3000/data/data1.json")
      .then((res) => res.json())
      .then((res) => setCallData(res.data));
  }, []);

  return (
    <>
      <div className={cx("topContainer")}>
        <Top />
        <Logo />
        <MenuTab onMenuClick={handleMenu} menuOnOff={menuOnOff} />
      </div>
      <section className={cx("myCall")}>
        <div className={cx("container")}>
          {menuOnOff[0] &&
            callData.map((item, idx) => <CardOne key={idx} info={item} />)}
          {menuOnOff[1] &&
            callData.map((item, idx) => <CardOne key={idx} info={item} />)}
          {menuOnOff[2] &&
            callData.map((item, idx) => (
              <CardTwo key={idx} info={item} menuOnOff={menuOnOff} />
            ))}
          {menuOnOff[3] &&
            callData.map((item, idx) => (
              <CardTwo key={idx} info={item} menuOnOff={menuOnOff} />
            ))}
          {menuOnOff[4] &&
            callData.map((item, idx) => (
              <CardTwo key={idx} info={item} menuOnOff={menuOnOff} />
            ))}
        </div>
        <Bottom />
      </section>
    </>
  );
};

export default MyCall;
