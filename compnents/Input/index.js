import React from "react";

import classNames from "classNames/bind";
import styles from "./Input.scss";

const cx = classNames.bind(styles);

export const Input = ({
  id,
  name,
  placeholder,
  type,
  value,
  onChange,
  counter,
  subButton,
  subOnClick,
  verifyCheck,
}) => {
  return (
    <div className={cx("inputWrap")}>
      <input
        id={id || null}
        name={name || null}
        type={type || "text"}
        placeholder={placeholder}
        onChange={!verifyCheck ? (e) => onChange(e) : null}
        value={value || ""}
      />
      {subButton && (
        <button
          id={id || null}
          className={cx(
            { off: !verifyCheck && id === "verify" },
            { on: value !== undefined && value.length > 5 && id === "verify" }
          )}
          onClick={subOnClick || null}
          disabled={verifyCheck || null}
        >
          {subButton}
        </button>
      )}
    </div>
  );
};
