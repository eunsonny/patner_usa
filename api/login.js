import axios from "axios";

class UserLogin {
  constructor() {
    this.userLogin = axios.create({
      baseURL: "http://wecode-dev.rencar.co.kr/api/v1",
    });
  }

  async USER_LOGIN(user) {
    try {
      const response = await this.userLogin.post("users/login", {
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
