export const USER_LOGIN = (user) => {
  return fetch("http://wecode-dev.rencar.co.kr/api/v1/users/login", {
    method: "POST",
    body: JSON.stringify({ login_id: "hello", password: "asdfasdf" }),
  }).then((response) => response.json());
};
