import { tokenStore } from "./tokenStore";
import { companyStore } from "./companyStore";
import { validation } from  "./validation";
import { employeeStore } from "./employeeStore";

const useStore = () => {
  return { companyStore, validation, employeeStore, tokenStore };
}

export default useStore;
