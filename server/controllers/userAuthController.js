const userModel = require("../models/userModel");
const { JWT_KEY } = process.env;
const jwt = require("jsonwebtoken");
const { sendMail } = require("../utility/nodemailer");

const bcrypt = require("bcryptjs");

//sign up user

module.exports.userSignup = async function userSignup(req, res) {
  try {
    let dataObj = req.body;
    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt);
    let user = await userModel.create({
      ...dataObj,
      password: secPassword,
      confirmPassword: secPassword,
    });

    if (user) {
      sendMail("signup", user);
      res.json({
        message: "user signed up",
        data: user,
      });
    } else {
      res.json({
        message: "not able to make user in userModel",
      });
    }
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

//login user

module.exports.userLogin = async function userLogin(req, res) {
  try {
    let data = req.body;
    const { password } = data;

    if (data.email) {
      let user = await userModel.findOne({
        email: data.email,
      });

      if (user) {
        const pwdCompare = await bcrypt.compare(password, user.password);

        if (pwdCompare) {
          let uid = user["_id"];
          let token = jwt.sign({ payload: uid }, JWT_KEY);

          // res.cookie("login", token, { httpOnly: true });

          return res.json({
            message: "user has logged in ",
            data: user,
            authToken: token,
          });
        } else {
          return res.json({
            message: "Wrong credentials",
          });
        }
      } else {
        return res.json({
          message: "user not found",
        });
      }
    } else {
      res.json({
        message: "Empty field found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//user protect Route

module.exports.userProtectRoute = async function userProtectRoute(
  req,
  res,
  next
) {
  try {
    let token;
    if (req.cookies.login) {
      token = req.cookies.login;
      let payload = jwt.verify(token, JWT_KEY);

      if (payload) {
        const user = await userModel.findById(payload.payload);

        console.log(payload.payload);
        console.log("Thisi is user.id", user.id);
        req.id = user.id;
        next();
      }
    } else {
      const client = req.get("User-Agent");

      if (client.includes("Mozilla") == true) {
        res.redirect("/user-login");
      }

      return res.json({
        message: "Please login",
      });
    }
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

module.exports.userLogout = function userLogout(req, res) {
  res.cookie("userLogin", "", { maxAge: 1 });
  res.json({
    message: "user logged out successfully",
  });
};
