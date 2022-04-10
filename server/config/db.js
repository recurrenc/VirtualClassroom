const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost:27017/EClassroom",
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  },
  (err) => {
    if (!err) {
      console.log("MongoDB Connection Succeded");
    } else {
      console.log("Error in DB conncection: " + err);
    }
  }
);

require("../models/seance.model");
