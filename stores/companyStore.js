import { observable } from "mobx";

const companyStore = observable({
  registerInfo: {},
  addInfo(name, value) {
    this.registerInfo = { ...this.registerInfo, [name]: value };
  },
  address: {},
  getAddress (name, value) {
    this.address = {...this.address, [name]: value}
  },
  results: {},
  addResult (result) {
    this.results = {...this.results, ...result};
  },
});

export { companyStore };
