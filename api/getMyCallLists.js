import axios from "axios";
class GetMyCallLists {
  constructor(TOKEN) {
    this.getMyCallLists = axios.create({
      baseURL: "http://wecode-dev.rencar.co.kr/api/v1",
      headers: { Authorization: TOKEN },
    });
  }

  async GET_CALL_CARDS(menu) {
    try {
      const response = await this.getMyCallLists.get("requests", {
        params: {
          status: menu,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async GET_CDM_CARDS(menu) {
    try {
      const response = await this.getMyCallLists.get("requests", {
        params: {
          status: menu || 0,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}
export default GetMyCallLists;
