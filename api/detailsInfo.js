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
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async POST_PROPOSAL_INFO() {
    try {
      const response = await this.DetailsInfo.post("api/v1/offers", {
        request_id: proposalStore.requestId,
        offer_car1: proposalStore.proposalInfo.offerCar1,
        offer_car2: proposalStore.proposalInfo.offerCar2,
        offer_extra: proposalStore.proposalInfo.offerExtra,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async MODIFY_PROPOSAL () {
    try {
      const response = await this.DetailsInfo.post(`api/v1/offers/${proposalStore.offerId}`, {
        offer_car1 : proposalStore.modifyInfo.offerCar1,
        offer_car2 : proposalStore.modifyInfo.offerCar2,
        offer_extra : proposalStore.modifyInfo.offerExtra
      })
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async CANCEL_PROPOSAL () {
    try {
      const response = await this.DetailsInfo.post(`api/v1/offers/${proposalStore.offerId}/cancel`)
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async DISPATCH_CAR () {
    try {
      const response = await this.DetailsInfo.post(`api/v1/offers/${proposalStore.offerId}/dispatch`)
      return response.data;
    } catch(error) {
      console.log(error);
    }
  }

  async CANCEL_DISPATCH () {
    try{
      const response = await this.DetailsInfo.post(`api/v1/offers/${proposalStore.offerId}/dispatch/cancel`)
      return response.data;
    } catch(error){
      console.log(error);
    }
  }

  async RETURN_CAR () {
    try {
      const response = await this.DetailsInfo.post(`api/v1/offers/${proposalStore.offerId}/return`)
      return response.data;
    } catch(error) {
      console.log(error);
    }
  }
}

export default DetailsInfo;
