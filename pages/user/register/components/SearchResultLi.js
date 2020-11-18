import React from 'react';
import classNames from "classnames/bind";
import styles from "./searchResultLi.scss";

const cx = classNames.bind(styles); 

const searchResultLi = ({ companyName, companyAddress, onClick, id }) => {
  return (
    <li className={cx("searchResultLi")} onClick={onClick || null} id={id}>
      <span>{companyName}</span>
      <span>{companyAddress.length > 25? `${companyAddress.substring(0, 25)}...` : companyAddress}</span>
    </li>
  );
};

export default searchResultLi;