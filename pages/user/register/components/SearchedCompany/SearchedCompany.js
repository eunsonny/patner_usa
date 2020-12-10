import React from "react";
import classNames from "classNames/bind";
import styles from "./searchedCompany.scss";

const cx = classNames.bind(styles);

const SearchedCompany = ({ companyName, companyAddress, onClick, id }) => {
  return (
    <li className={cx("searchedCompany")} onClick={onClick || null} id={id}>
      <span>{companyName}</span>
      <span>{companyAddress}</span>
    </li>
  );
};

export default SearchedCompany;
