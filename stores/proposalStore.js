import { observable } from "mobx";

const proposalStore = observable({
  proposalInfo: {},
  addInfo(name, value) {
    this.proposalInfo = {...this.proposalInfo, [name]: value };
  }
});

export { proposalStore };