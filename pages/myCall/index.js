import React, { useEffect, useState } from "react";
import styles from "./myCall.scss";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import classNames from "classNames/bind";
import GetMyCallLists from "../../api/getMyCallLists";
import Top from "../../components/atoms/top";
import MenuTab from "./menuTab";
import CardOne from "./cardOne";
import CardTwo from "./cardTwo";
import Bottom from "../../components/atoms/bottom";
import Logo from "../../components/atoms/logo";

const cx = classNames.bind(styles);
const MyCall = (props) => {
  const router = useRouter();
  const [cookies] = useCookies();
  const { TOKEN } = cookies;
  const [menuOnOff, setMenu] = useState({});
  const [callData, setCallData] = useState([]);
  const handleMenu = (e) => {
    const response = new GetMyCallLists(TOKEN);
    const { id } = e.currentTarget;
    window.scrollTo(0, 0);
    setMenu({ [id]: true });
    response //
      .GET_CALL_CARDS(id)
      .then((res) => setCallData(res.message));
  };
  useEffect(() => {
    const response = new GetMyCallLists(TOKEN);
    const menu = router.asPath.split("=")[1];
    menu ? setMenu({ [menu]: true }) : setMenu({ 0: true });
    response //
      .GET_CDM_CARDS(menu)
      .then((res) => setCallData(res.message));
  }, []);
  return (
    <>
      <div className={cx("topContainer")}>
        <Top />
        <Logo />
        <MenuTab onMenuClick={handleMenu} menuOnOff={menuOnOff} />
      </div>
      <section className={cx("myCall")}>
        <div className={cx("container")}>
          {menuOnOff[0] &&
            callData.map((item) => (
              <CardOne
                key={item.request_id}
                id={item.request_id}
                info={item}
                menuNum={0}
              />
            ))}
          {menuOnOff[1] &&
            callData.map((item) => (
              <CardOne
                key={item.request_id}
                id={item.request_id}
                info={item}
                menuNum={1}
              />
            ))}
          {menuOnOff[2] &&
            callData.map((item) => (
              <CardTwo
                key={item.request_id}
                info={item}
                menuOnOff={menuOnOff}
                id={item.request_id}
                menuNum={2}
              />
            ))}
          {menuOnOff[3] &&
            callData.map((item, idx) => (
              <CardTwo
                key={item.request_id}
                info={item}
                menuOnOff={menuOnOff}
                id={item.request_id}
                menuNum={3}
              />
            ))}
          {menuOnOff[4] &&
            callData.map((item, idx) => (
              <CardTwo
                key={item.request_id}
                info={item}
                menuOnOff={menuOnOff}
                id={item.request_id}
                menuNum={4}
              />
            ))}
        </div>
        <Bottom />
      </section>
    </>
  );
};
export default MyCall;
