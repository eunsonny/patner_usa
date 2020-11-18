import { observable } from "mobx";

const validation = observable({
  results: {},
  addResult(result) {
    this.results = {...this.results, ...result};
  },
})

export { validation };
