import { tokenStore } from "./tokenStore";
import { companyStore } from "./companyStore";
import { employeeStore } from "./employeeStore";
import { proposalStore } from "./proposalStore";

const useStore = () => {
  return { companyStore, employeeStore, tokenStore, proposalStore };
}

export default useStore;
