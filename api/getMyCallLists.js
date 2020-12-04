import axios from "axios";

class GetMyCallLists {
  constructor() {
    this.getMyCallLists = axios.create({
      baseURL: "http://wecode-dev.rencar.co.kr/api/v1",
    });
  }

  async GET_CALL_CARDS(menu, userToken) {
    try {
      const response = await this.getMyCallLists.get("requests", {
        headers: { Authorization: userToken },
        params: {
          menutab: menu,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async GET_CDM_CARDS(menu, userToken) {
    try {
      const response = await this.getMyCallLists.get("requests", {
        headers: { Authorization: userToken },
        params: {
          menutab: Number(menu || 0) + 1,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default GetMyCallLists;
