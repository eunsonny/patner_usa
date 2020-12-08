import React, { useState, useEffect } from "react";

import styles from "./landing.scss";
import classNames from "classNames/bind";

import LandingTop from "./landingTop";
import LandingMiddleTop from "./landingMiddleTop";
import LandingMiddle from "./landingMiddle";
import Footer from "./footer";

const cx = classNames.bind(styles);

const Landing = (props) => {
  const [position, setPosition] = useState();

  const handleScrollPosition = () => {
    setPosition(window.pageYOffset);
  };

  useEffect(() => {
    scroll(0, 0);
    window.addEventListener("scroll", handleScrollPosition, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScrollPosition);
    };
  }, []);

  return (
    <section className={cx("landing")} onScroll={handleScrollPosition}>
      <LandingTop />
      <LandingMiddleTop position={position} />
      <LandingMiddle position={position} />
      <Footer />
    </section>
  );
};

export default Landing;
