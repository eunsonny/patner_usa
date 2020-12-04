import { tokenStore } from "./tokenStore";
import { companyStore } from "./companyStore";
import { employeeStore } from "./employeeStore";
import { proposalStore } from "./proposalStore";
import { myInfoStore } from "./myInfoStore";

const useStore = () => {
  return { companyStore, employeeStore, tokenStore, proposalStore, myInfoStore };
}

export default useStore;
