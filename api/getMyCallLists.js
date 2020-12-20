import axios from "axios";
import { API } from "../config";

class GetMyCallLists {
  constructor(TOKEN) {
    this.getMyCallLists = axios.create({
      baseURL: API,
      headers: { Authorization: TOKEN },
    });
  }

  async GET_CALL_CARDS(menu, offset) {
    try {
      const response = await this.getMyCallLists.get("api/v1/requests", {
        params: {
          status: menu,
          limit: 4,
          offset: offset || 0,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async GET_CDM_CARDS(menu) {
    try {
      const response = await this.getMyCallLists.get("api/v1/requests", {
        params: {
          status: menu || 0,
          limit: 4,
          offset: 0,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}
export default GetMyCallLists;
