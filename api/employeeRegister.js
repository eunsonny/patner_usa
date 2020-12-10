import axios from "axios";
import { API } from "../config";
import useStore from "../stores/useStore";

const { employeeStore } = useStore();

class EmployeeRegister {
  constructor() {
    this.employeeRegister = axios.create({
      baseURL: API,
    });
  }

  async CHECK_ID_AVAILABLE() {
    try {
      const response = await this.employeeRegister.get(`/api/v1/users/check`, {
        params: {
          user_type_id: 2,
          login_id: employeeStore.registerInfo.userId,
        },
      });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  async POST_EMPLOYEE_REGISTER_INFO() {
    try {
      const response = await this.employeeRegister.post(`api/v1/users`, {
        login_id: employeeStore.registerInfo.userId,
        password: employeeStore.registerInfo.password,
        user_type_id: 2,
        user_detail_type_id: 2,
        name: employeeStore.registerInfo.userName,
        contact: employeeStore.registerInfo.userNumber,
        email: employeeStore.registerInfo.email,
        rental_company_id: employeeStore.company.id,
        rental_company_user_position_id: 2,
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}

export default EmployeeRegister;
