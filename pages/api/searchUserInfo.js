const BASEURL = "http://wecode-dev.rencar.co.kr/api/v1";

export const SEARCH_USER_ID = () => {
  //주소 : ${BASEURL}/user/find-id
  return fetch(`http://localhost:3000/data/data.json`, {
    method: "GET",
    body: JSON.stringify({
      user_type_id: 2,
      name: value.name,
      contact: value.phone,
    }),
  })
    .then((res) => res.json())
    .then((res) => res);
};

export const SEARCH_USER_PASSWORD = (value) => {
  return fetch(`${BASEURL}/user/find-pw`, {
    method: "POST",
    body: JSON.stringify({
      user_type_id: 2,
      login_id: value.name,
      contact: value.phone,
      password: value.secondPwd,
    }),
  })
    .then((res) => res.json())
    .then((res) => res);
};

export const REQUEST_NUMBER = (value) => {
  const { userName, phone } = value;
  const nameValidation = userName.length > 2;
  const phoneValidation = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{4}-?[0-9]{4}$/.test(
    phone
  );
  return nameValidation && phoneValidation;
};
