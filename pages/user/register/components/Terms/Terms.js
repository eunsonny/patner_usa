import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Terms.scss";

import Term from "../Term/Term";
import TERM_LISTS from "./termLists";
import useForm from "../../components/useForm";

const cx = classNames.bind(styles);

const Terms = ({ setIsActive }) => {
  const [checkItems, setCheckItems] = useState([false, false, false]);
  const [allCheck, setAllCheck] = useState(false);

  useForm(allCheck);

  useEffect(() => {
    const checkStatus = checkItems.every((item) => item);
    setAllCheck(checkStatus);
    setIsActive(allCheck);
  }, [checkItems, allCheck]);

  const handleAllCheck = () => {
    allCheck
      ? setCheckItems([false, false, false])
      : setCheckItems([true, true, true])
  };

  const handleSingleCheck = (e) => {
    const num = e.target.id;
    const newCheckItems = [...checkItems];
    newCheckItems[num] = !newCheckItems[num];
    setCheckItems(newCheckItems);
  };

  return (
    <section className={cx("Terms")}>
      <span className={cx("title")}>Terms.</span>
      <div className={cx("totalCheckBoxCon")}>
        <Term
          desc={"전체 약관에 동의 합니다."}
          idValue={"allCheck"}
          checked={allCheck}
          onChange={handleAllCheck}
        />
      </div>
      <div className={cx("checkBoxCon")}>
        {TERM_LISTS.map((term, idx) => (
          <Term
            key={idx}
            id={idx}
            desc={term.desc}
            idValue={term.idValue}
            checked={checkItems[idx]}
            onChange={handleSingleCheck}
          />
        ))}
      </div>
    </section>
  );
};

export default Terms;
