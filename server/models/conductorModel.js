const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const { db_link } = process.env;
const emailValidator = require("email-validator");

mongoose
  .connect(db_link)
  .then((db) => {
    console.log("conductor data base connected");
  })
  .catch((err) => {
    console.log(err.message);
  });

const conductorSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  properties: {
    email: {
      type: String,
      required: true,
    },
    conductorId: {
      type: String,
      required: true,
    },
    aadharNumber: {
      type: Number,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    profileImage: {
      type: String,
      default: "img/users/default.jpeg",
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    confirmPassword: {
      type: String,
      required: true,
      minLength: 8,
    },
    address: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
  },
});

const conductorModel = mongoose.model("conductorModel", conductorSchema);

module.exports = conductorModel;
