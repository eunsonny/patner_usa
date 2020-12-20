import axios from "axios";
import useStore from "../stores/useStore";
import { API } from "../config";

const { myInfoStore } = useStore();

class UserInfo {
  constructor(TOKEN) {
    this.UserInfo = axios.create({
      baseURL: API,
      headers: { Authorization: TOKEN },
    });
  }

  async GET_USER_INFO() {
    try {
      const response = await this.UserInfo.get("api/v1/users");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async MODIFY_USER_INFO() {
    try {
      const response = await this.UserInfo.post("api/v1/users/info" , {
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
