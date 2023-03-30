const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const emailValidator = require("email-validator");
// const bcrypt = require("bcrypt");
const crypto = require("crypto");

const { db_link } = process.env;

mongoose
  .connect(db_link)
  .then(function (db) {
    console.log("user data base connected");
  })
  .catch((err) => {
    console.log("error");
  });

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: function () {
      return emailValidator.validate(this.email);
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  subscribed: {
    type: Boolean,
    default: true,
  },
  confirmPassword: {
    type: String,
    required: true,
    minLength: 8,
    validate: function () {
      return this.confirmPassword == this.password;
    },
  },
  profileImage: {
    type: String,
    default: "img/users/default.jpeg",
  },
  resetToken: String,
});

// userSchema.pre("save", function () {
//   this.confirmPassword = undefined;
// });

// // userSchema.pre("save", async function () {
// //   let salt = await bcrypt.genSalt();
// //   let hashedString = await bcrypt.hash(this.password, salt);
// //   this.password = hashedString;
// // });

// userSchema.post("save", (doc) => {
//   console.log("Post save called", doc);
// });

// userSchema.methods.createResetToken = function () {
//   // crypto package...
//   // crypto is now built in with nodejs

//   const resetToken = crypto.randomBytes(32).toString("hex");
//   this.resetToken = resetToken;
//   return resetToken;
// };

// userSchema.methods.resetPasswordHandler = function (password, confirmPassword) {
//   this.password = password;
//   this.confirmPassword = confirmPassword;
//   this.resetToken = undefined;
// };

const userModel = mongoose.model("userModel", userSchema);

module.exports = userModel;
