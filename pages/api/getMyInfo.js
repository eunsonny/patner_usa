export default (req, res) => {
  res.statusCode = 200;
  res.json({
    info: {
      user_id: "crystal00",
      user_name: "Sujeong Park",
      user_number: "010-2314-2342",
      position: "CEO",
      email: "crystal@gmail.com",
      company_name: "imsUSA2020",
      company_address: "New York, NY, 10014",
      intro: "Innovative rental Car...",
      domestic_car: 000,
      overseas_car: 000,
    },
  });
};

