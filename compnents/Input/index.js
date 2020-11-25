// import React, { Component, Fragment } from 'react';

// class Input extends Component {

//   render() {
//     return (
//       <Fragment>
//         <label
//           htmlFor={this.props.id ? this.props.id : null}
//           children={this.props.label}
//         />
//         <input
//           id={this.props.id ? this.props.id : null}
//           type={this.props.type ? this.props.type : 'text'}
//           onChange={e => this.props.onChange(e.target.value)}
//           value={this.props.value ? this.props.value : ''}
//         />
//       </Fragment>
//     )
//   }
// }

// export default Input

import { verify } from "crypto";
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
