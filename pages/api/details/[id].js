export default (req, res) => {
  res.statusCode = 200;
  res.json({
    message: 
      {
        offer_id: 8,
        request_id: req.query.id,
        customer_car: "제니시스 G90",
        customer_car_number: "01가3098",
        customer_contact: "010-9809-8232",
        location: "서울특별시 강남구",
        request_time: "2020.11.04 16:20",
        request_extra: "빠른 처리 부탁드립니다.",
        offer_car1: "SM 7",
        offer_car2 : null,
        offer_extra: "-",
        status: 3,
      },
  });
};
