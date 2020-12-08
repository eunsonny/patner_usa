import React from "react";

import classNames from "classNames/bind";

import styles from "./Button.scss";

const cx = classNames.bind(styles);

const SearchButton = ({ content, activeBtn, onClickNextBtn, name }) => {
  return (
    <button
      className={cx({ on: activeBtn }, { off: !activeBtn })}
      data-name={name || null}
      onClick={(e) => onClickNextBtn(e) || null}
      disabled={!activeBtn}
    >
      {content}
    </button>
  );
};

export default SearchButton;
