import React, { useState } from "react";
import Link from "next/link";

import styles from "./LoginSelect.scss";

const login = (props) => {
  const [status, setStatus] = useState({
    company: false,
    employee: false,
  });

  const handleCheckStatus = (e) => {
    let checkStatus = { company: false, employee: false };
    const statusName = e.currentTarget.dataset.name;
    checkStatus = {
      ...checkStatus,
      [statusName]: !checkStatus[statusName],
    };
    setStatus(checkStatus);
  };

  const buttonStatus = Object.values(status).includes(true);

  return (
    <section className={styles.loginSelect}>
      <div className={styles.sentence}>
        <p>Select your status.</p>
      </div>
      <form className={styles.selectStatus}>
        <label
          className={status.company ? styles.on : ""}
          data-name="company"
          onClick={handleCheckStatus}
        >
          Company
          <input
            type="radio"
            className={styles.checkBox}
            checked={status.company}
            onChange={handleCheckStatus}
          />
          <span className={styles.checkmark}></span>
        </label>
        <label
          className={status.employee ? styles.on : ""}
          data-name="employee"
          onClick={handleCheckStatus}
        >
          Employee
          <input
            type="radio"
            className={styles.checkBox}
            checked={status.employee}
            onChange={handleCheckStatus}
          />
          <span className={styles.checkmark}></span>
        </label>
      </form>
      <div className={styles.nextButton}>
        <button
          className={buttonStatus ? styles.on : ""}
          disabled={!buttonStatus}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default login;
