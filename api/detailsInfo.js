import axios from "axios";
import useStore from "../stores/useStore";

const { proposalStore } = useStore();

class DetailsInfo {
  constructor(TOKEN) {
    this.DetailsInfo = axios.create({
      baseURL: "http://wecode-dev.rencar.co.kr",
      headers: { Authorization: TOKEN },
    });
    this.offerId = proposalStore.offerId;
  }

  

  async GET_REQUEST_INFO() {
    try {
      const response = await this.DetailsInfo.get(
        `api/v1/requests/${proposalStore.requestId}/offer`,
        {
          params: {
            status: proposalStore.pageTab,
          },
        }
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async POST_PROPOSAL_INFO() {
    try {
      const response = await this.DetailsInfo.post("api/v1/offers", {
        request_id: 19,
        offer_car1: proposalStore.proposalInfo.offerCar1,
        offer_car2: proposalStore.proposalInfo.offerCar2,
        offer_extra: proposalStore.proposalInfo.offerExtra,
      });
      console.log(response)
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async CANCEL_PROPOSAL () {
    try {
      const response = await this.DetailsInfo.post(`api/v1/offers/${proposalStore.offerId}/cancel`)
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}

export default DetailsInfo;
