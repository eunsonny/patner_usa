export default class User {
  constructor(data) {
    // console.log(data)
    this.name = data.name;
    this.title = data.title;
    this.age = data.age;
    this.gender = data.gender;
  }

  get getUserInfo() {
    return {
      name: this.name,
      title: this.title,
      age: this.age,
      gender: this.gender,
    }
  }

  get getUserName() {
    return { name: this.name }
  }
}