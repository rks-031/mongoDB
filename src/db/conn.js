const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/students-api", {
    useFindAndModify: false,
  })
  .then(() => console.log("connection successful"))
  .catch((err) => console.log("connection unsuccessful"));
