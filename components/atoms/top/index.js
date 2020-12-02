import React from "react";

import classNames from "classNames/bind";

import styles from "./top.scss";

const cx = classNames.bind(styles);

const Top = (props) => <div className={cx("top")} />;

export default Top;
