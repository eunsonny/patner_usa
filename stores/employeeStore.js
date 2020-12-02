import { observable } from "mobx";

const employeeStore = observable({
  registerInfo: {},
  addInfo(name, value) {
    this.registerInfo = { ...this.registerInfo, [name]: value };
  },
  company: {},
  addCompany(value) {
    this.company = { ...this.company, ...value};
  },
  results: {},
  addResult(result) {
    this.results = { ...this.results, ...result };
  },
});

export { employeeStore };
