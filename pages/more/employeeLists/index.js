import React, { useState } from "react";

import classNames from "classNames/bind";
import Link from "next/link";

import styles from "./employeeLists.scss";
import Top from "../../../components/atoms/top/top";
import EmployeeList from "../../../components/molecules/employeeList/employeeList";

const cx = classNames.bind(styles);

const EmployeeLists = (props) => {
  const [employees, setEmployee] = useState([
    "철수",
    "영희",
    "지영",
    "동원",
    "수연",
    "민승",
    "예진",
    "성태",
    "정현",
    "채영",
  ]);

  const [actived, setActived] = useState({ value: " " });

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
