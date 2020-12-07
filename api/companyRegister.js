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
    const response = await this.companyRegister.get(
      `api/v1/users/check?user_type_id=2&login_id=${companyStore.registerInfo.userId}`,
      {
        params: {
          user_type_id: 2,
          login_id: companyStore.registerInfo.userId,
        },
      }
    );
    return response.data.message;
  }

  async POST_COMPANY_REGISTER_INFO() {
    const response = await this.companyRegister.post(`api/v1/users`, {
      login_id: companyStore.registerInfo.userId,
      password: companyStore.registerInfo.password,
      user_type_id: 2,
      user_detail_type_id: 2,
      name: companyStore.registerInfo.userName,
      contact: companyStore.registerInfo.userNumber,
      company_name: companyStore.registerInfo.companyName,
      company_contact: "010-2398-3234",
      address: totalAddress,
      rental_company_user_position_id: 1,
    });
    return response.data.post;
  }
}

export default CompanyRegister;
