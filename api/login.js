import axios from "axios";
import { API } from "../config";

class UserLogin {
  constructor() {
    this.userLogin = axios.create({
      baseURL: API,
    });
  }

  async USER_LOGIN(user) {
    try {
      const response = await this.userLogin.post("api/v1/users/login", {
        user_type_id: 2,
        login_id: user.loginId,
        password: user.password,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default UserLogin;
