import axios from "axios";
import { API } from "../config";
import useStore from "../stores/useStore";

const { companyStore } = useStore();

class CompanyRegister {
  constructor() {
    this.companyRegister = axios.create({
      baseURL: API,
    });
  }

  async CHECK_ID_AVAILABLE() {
    try {
      const response = await this.companyRegister.get(`api/v1/users/check`, {
        params: {
          user_type_id: 2,
          login_id: companyStore.registerInfo.userId,
        },
      });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  async POST_COMPANY_REGISTER_INFO() {
    try {
      const response = await this.companyRegister.post(`api/v1/users`, {
        login_id: companyStore.registerInfo.userId,
        password: companyStore.registerInfo.password,
        user_type_id: 2,
        user_detail_type_id: 2,
        name: companyStore.registerInfo.userName,
        contact: companyStore.registerInfo.userNumber,
        email: companyStore.registerInfo.email,
        company_name: companyStore.registerInfo.companyName,
        company_contact: "010-2398-3234",
        address: Object.values(companyStore.address).join(", "),
        rental_company_user_position_id: 1,
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}

export default CompanyRegister;
