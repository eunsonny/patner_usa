import React, { useState } from "react";
import { useRouter } from "next/router";

import styles from "./loginSelect.scss";

const LoginSelect = (props) => {
  const router = useRouter();

  const [status, setStatus] = useState({
    company: false,
    employee: false,
  });

  const handleSignUp = () => {
    status.company && router.push("/user/register/company");
    status.employee && router.push("/user/register/employee");
  };

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
          onClick={handleSignUp}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default LoginSelect;
