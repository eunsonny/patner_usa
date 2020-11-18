import React, { useEffect, useState } from "react";
import Router from "next/router";
import classNames from "classnames/bind";
import useStore from "../../../../stores/useStore";
import styles from "./search.scss";
import SearchedCompany from "../components/SearchedCompany/SearchedCompany";
import { API } from "../../../../config";

import InputWrapper from "../../../../components/molecules/inputWrapper/inputWrapper";

const cx = classNames.bind(styles);

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isVisible, setIsVisible] = useState(true);

  const { employeeStore } = useStore();

  const fetchData = (value) => {
    fetch(
      `${API}/api/v1/users/company?user_detail_type_id=2&company_name=${value}`
    )
      .then((res) => res.json())
      .then((res) => {
        console.log("============ 통신확인 ===========");
        console.log(res.result);
        setSearchResult(res.result);
      });
  };

  useEffect(() => {
    if(searchResult.length > 0) {
      setIsVisible(false);
    } else {
      setIsVisible(true)
    }
  }, [searchResult])

  const handleSearchValue = (e) => {
    const { value } = e.target;
    setSearchValue(value);
    fetchData(value);
  };

  const getTarget = (e) => {
    employeeStore.addCompany({ companyName : e.currentTarget.firstChild.innerText});
    setSearchValue(e.currentTarget.firstChild.innerText);
    employeeStore.addCompany({ id : e.currentTarget.id });
    setIsVisible(true)
  }

  return (
    <div className={cx("search")}>
      <div className={cx("header")}>
        <div className={cx("headerBox")}></div>
        <div>
          <button onClick={() => Router.push("/user/register/employee")}>
            <img src="/images/blue_arrow_left.svg" className={cx("arrow")} />
          </button>
          <span>Company search</span>
        </div>
      </div>
      <div className={cx("container")}>
        <div className={cx("content")}>
          <InputWrapper
            value={searchValue}
            onChange={handleSearchValue}
            placeholder="please enter the company name"
          />
          <ul className={cx("searchResultCon", { visibility : isVisible })}>
            {searchResult.map((result, idx) => (
              <SearchedCompany
                key={idx}
                onClick={getTarget}
                id={result.id}
                companyName={result.company_name}
                companyAddress={result.company_address}
              />
            ))}
          </ul>
        </div>
        <button
          onClick={() => Router.push("/user/register/employee")}
          className={cx("confirmBtn")}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default Search;
