import { tokenStore } from "./tokenStore";
import { companyStore } from "./companyStore";
import { employeeStore } from "./employeeStore";

const useStore = () => {
  return { companyStore, employeeStore, tokenStore };
}

export default useStore;
