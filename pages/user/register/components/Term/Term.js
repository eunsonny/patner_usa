import React from "react";
import classNames from "classNames/bind";
import styles from "./Term.scss";

const cx = classNames.bind(styles);

const Term = ({ id, idValue, desc, checked, onChange }) => {
  return (
    <div className={cx("Term")}>
      <input id={id} type="checkbox" checked={checked} onChange={onChange} />
      <label htmfor={idValue}></label>
      <span>{desc}</span>
      <button>
        <img src="/images/ic_arrow_right_terms.svg" />
      </button>
    </div>
  );
};

export default Term;
