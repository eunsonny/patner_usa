import axios from "axios";

class UserSearch {
  constructor() {
    this.userSearch = axios.create({
      baseURL: "http://wecode-dev.rencar.co.kr/api/v1",
    });
  }

  async SEARCH_USER_ID(value) {
    const response = await this.userSearch.get("users/login-id", {
      params: {
        user_type_id: 2,
        name: value.userName,
        contact: value.phone,
      },
    });
    return response.data.result[0];
  }

  async SEARCH_USER_PASSWORD(value) {
    const response = await this.userSearch.post("users/password", {
      user_type_id: 2,
      login_id: value.userId,
      contact: value.phone,
      password: value.secondPwd,
    });
    return response.data.message;
  }
}

export default UserSearch;
