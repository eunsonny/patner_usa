import axios from "axios";
import { API } from "../config";

class UserSearch {
  constructor() {
    this.userSearch = axios.create({
      baseURL: API,
    });
  }

  async SEARCH_USER_ID(value) {
    const response = await this.userSearch.get("api/v1/users/login-id", {
      params: {
        user_type_id: 2,
        name: value.userName,
        contact: value.phone,
      },
    });
    return response.data.result[0];
  }

  async SEARCH_USER_PASSWORD(value) {
    try {
      const response = await this.userSearch.post("api/v1/users/password", {
        user_type_id: 2,
        login_id: value.userId,
        contact: value.phone,
        password: value.secondPwd,
      });
      return response.data.message;
    } catch (error) {
      console.log(error);
    }
  }
}

export default UserSearch;
