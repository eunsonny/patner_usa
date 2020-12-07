import { observable } from "mobx";

const proposalStore = observable({
  proposalInfo: {},
  addInfo(name, value) {
    this.proposalInfo = {...this.proposalInfo, [name]: value };
  },
  requestId: 0,
  getRequestId (value){
    this.requestId = value;
  },
  offerId: 0,
  getOfferId (value) {
    this.offerId = value
  },
  pageTab: 0,
  getPageTab (value) {
    this.pageTab = value;
  },
});

export { proposalStore };