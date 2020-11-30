import React, { useState } from "react";

import classNames from "classNames/bind";
import styles from "./searchId.scss";

import { SearchInput } from "../../../../components/atoms/SearchInput/Index";

const cx = classNames.bind(styles);

const SearchId = ({
  searchInfo: {
    onChangeInput,
    onClickVerify,
    onClickRequest,
    verifyCheck,
    request,
    counter,
    verifyText,
    value,
  },
}) => {
  const handleChangeInput = (e) => {
    onChangeInput(e);
  };

  let minutes = Math.floor(counter / 60);

  let seconds =
    counter - minutes * 60 < 10
      ? `0${counter - minutes * 60}`
      : counter - minutes * 60;

  return (
    <section className={cx("SearchId")}>
      <SearchInput
        id={"userName"}
        placeholder={"User Name"}
        value={value.userName}
        onChange={handleChangeInput}
      />
      <SearchInput
        id={"phone"}
        placeholder={"User Number"}
        value={value.phone}
        onChange={handleChangeInput}
        subOnClick={(e) => onClickRequest(e)}
        verifyCheck={verifyCheck}
        subButton={request ? "재요청" : "인증요청"}
      />
      {request && (
        <div
          className={cx(
            "verifyCheckBox",
            { success: verifyCheck },
            { fail: !verifyCheck }
          )}
        >
          <SearchInput
            id={"verify"}
            placeholder={"인증번호를 입력해주세요"}
            value={value.verify}
            onChange={handleChangeInput}
            subOnClick={(e) => onClickVerify(e)}
            verifyCheck={verifyCheck}
            counter={counter}
            subButton={"확인"}
          />
          {!verifyCheck && (
            <span className={cx("timeLimit")}>{`0${minutes}:${seconds}`}</span>
          )}
        </div>
      )}
      {request && (
        <span className={cx({ success: verifyCheck }, { fail: !verifyCheck })}>
          {verifyText}
        </span>
      )}
    </section>
  );
};

export default SearchId;
