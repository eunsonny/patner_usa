import { observable } from "mobx";

const tokenStore = observable({
  userToken: "",
});

export { tokenStore };

// 새로운 스토어가 생길때마다 관찰 받을 수 있는 상태를 만들기 위해서 observable을 감싸준다.
