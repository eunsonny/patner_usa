import axios from "axios";

class GetUserInfo {
  constructor(TOKEN) {
    this.getUserInfo = axios.create({
      baseURL: "http://wecode-dev.rencar.co.kr/api/v1",
      headers: { Authorization: TOKEN },
    });
  }

  async GET_USER_INFO() {
    try {
      const response = await this.getUserInfo.get("users");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default GetUserInfo;
