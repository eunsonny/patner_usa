import axios from "axios";
import useStore from "../stores/useStore";

const { myInfoStore } = useStore();

class UserInfo {
  constructor(TOKEN) {
    this.UserInfo = axios.create({
      baseURL: "http://wecode-dev.rencar.co.kr/api/v1",
      headers: { Authorization: TOKEN },
    });
  }

  async GET_USER_INFO() {
    try {
      const response = await this.UserInfo.get("users");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async MODIFY_USER_INFO() {
    try {
      const response = await this.UserInfo.post("users/info" , {
        contact: myInfoStore.myInfo.userNumber,
        company_name: myInfoStore.myInfo.companyName,
        company_address: myInfoStore.myInfo.companyAddress,
        introduction: myInfoStore.myInfo.intro
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default UserInfo;
