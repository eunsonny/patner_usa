import axios from "axios";

class GetMyCallLists {
  constructor() {
    this.getMyCallLists = axios.create({
      baseURL: "http://wecode-dev.rencar.co.kr/api/v1",
    });
  }

  async GET_CALL_CARDS(menu, userToken) {
    const response = await this.getMyCallLists.get(API, {
      headers: { Authorization: userToken },
      params: {
        menutab: menu,
      },
    });

    return response.data;
  }
}

export default GetMyCallLists;
