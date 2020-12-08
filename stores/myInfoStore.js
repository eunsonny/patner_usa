import { observable } from "mobx";

const myInfoStore = observable({
  myInfo: {},
  addMyInfo(name, value) {
    this.myInfo = {...this.myInfo, [name]: value}
  }
})

export { myInfoStore };