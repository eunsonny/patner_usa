import React, { useEffect, useState } from "react";

import classNames from "classNames/bind";

import styles from "./bottom.scss";
import Link from "next/link";

const cx = classNames.bind(styles);

const Bottom = (props) => {
  const [path, setPath] = useState("");

  useEffect(() => {
    setPath(location.pathname);
  }, []);

  return (
    <section className={cx("bottom")}>
      {path.includes("myCall") ? (
        <Link href="/myCall">
          <img src="images/myCallOn.svg" />
        </Link>
      ) : (
        <Link href="/myCall">
          <img src="images/myCallOff.svg" />
        </Link>
      )}
      {path.includes("alarm") ? (
        <Link href="/alarm">
          <img className={cx("center")} src="images/bellOn.svg" />
        </Link>
      ) : (
        <Link href="/alarm">
          <img className={cx("center")} src="images/bellOff.svg" />
        </Link>
      )}
      {path.includes("more") ? (
        <Link href="/more">
          <img src="images/menuOn.svg" />
        </Link>
      ) : (
        <Link href="/more">
          <img src="images/menuOff.svg" />
        </Link>
      )}
    </section>
  );
};

export default Bottom;
