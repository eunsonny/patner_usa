export default (req, res) => {
  res.statusCode = 200;
  res.json({ requests : requestInfo });
}

const requestInfo = [
  {
    "id": 19001,
    "type": "제니시스 G90",
    "carNumber": "01가3098",
    "userNumber": "010-9809-8232",
    "area" :"서울특별시 강남구",
    "requestDate" : "2020.11.04 16:20",
    "additionalRequest": "빠른 처리 부탁드립니다."
  },
  {
    "id": 19002,
    "type": "제니시스 G90",
    "carNumber": "01가3098",
    "userNumber": "010-9809-8232",
    "area" :"서울특별시 강남구",
    "requestDate" : "2020.11.04 16:20",
    "additionalRequest": "빠른 처리 부탁드립니다."
  },
  {
    "id": 19003,
    "type": "제니시스 G90",
    "carNumber": "01가3098",
    "userNumber": "010-9809-8232",
    "area" :"서울특별시 강남구",
    "requestDate" : "2020.11.04 16:20",
    "additionalRequest": "빠른 처리 부탁드립니다."
  }
]