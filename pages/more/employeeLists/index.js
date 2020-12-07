import React, { useState } from "react";

import classNames from "classNames/bind";
import Link from "next/link";

import styles from "./employeeLists.scss";
import Top from "../../../components/atoms/top";
import EmployeeList from "../../../components/molecules/employeeList";

const cx = classNames.bind(styles);

const EmployeeLists = (props) => {
  const [employees, setEmployee] = useState([
    "창모",
    "도끼",
    "수퍼비",
    "스윙스",
    "창모",
    "도끼",
    "수퍼비",
    "스윙스",
    "창모",
    "도끼",
    "수퍼비",
    "스윙스",
  ]);

  const [actived, setActived] = useState({});

  const handleDelete = (e) => {
    setEmployee(
      employees //
        .filter((name, idx) => String(idx) !== e.target.id)
    );
  };

  const handleActive = (e) => {
    setActived({
      ...actived,
      [e.target.id]: !actived[e.target.id],
    });
  };

  return (
    <section className={cx("employeeLists")}>
      <div className={cx("fixedBox")}>
        <Top />
        <div className={cx("textBar")}>
          <Link href="/more">
            <div>
              <img
                src="/images/backArrow.png"
                alt="backArrow"
                className={cx("backArrow")}
              />
              <span>직원 리스트</span>
            </div>
          </Link>
        </div>
        <div className={cx("stateBar")}>
          <span>직원명</span>
          <span>활성상태</span>
        </div>
      </div>
      <div>
        <ul>
          {employees.map((name, idx) => (
            <EmployeeList //
              id={idx}
              name={name}
              key={idx}
              del={handleDelete}
              actived={actived}
              handleActive={handleActive}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default EmployeeLists;
