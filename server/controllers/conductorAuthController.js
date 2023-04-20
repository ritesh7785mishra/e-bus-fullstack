const conductorModel = require("../models/conductorModel");

const jwt = require("jsonwebtoken");
const { JWT_KEY } = process.env;

//conductor login
module.exports.conductorLogin = async function conductorLogin(req, res) {
  try {
    let data = req.body;

    if (data.email) {
      let conductor = await conductorModel.findOne({
        "properties.email": `${data.email}`,
      });

      if (conductor) {
        if (conductor.properties.password == data.password) {
          let cid = conductor["_id"];
          let token = jwt.sign({ payload: cid }, JWT_KEY);

          // res.cookie("conductorLogin", token, {
          //   // httpOnly: true,
          //   path: "/conductor",
          // });

          return res.json({
            message: "conductor logged in successfully",
            conductorAuthToken: token,
          });
        } else {
          res.json({
            message: "Wrong credentials",
          });
        }
      } else {
        res.json({
          message: "user not found",
        });
      }
    } else {
      res.json({
        message: "Please enter your email",
      });
    }
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

//getConductor Profile

module.exports.getConductorProfile = async function getConductorProfile(
  req,
  res
) {
  try {
    let { conductorAuthToken } = req.body;
    let payload = jwt.verify(conductorAuthToken, JWT_KEY);

    if (payload) {
      const conductor = await conductorModel.findById(payload.payload);

      res.json({
        conductor,
      });
    } else {
      res.json({
        message: "conductor not found",
      });
    }
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

//protectConductorRoute

module.exports.protectConductorRoute = async function protectConductorRoute(
  req,
  res,
  next
) {
  try {
    let token = req.cookies.conductorLogin;
    if (token) {
      let payload = jwt.verify(token, JWT_KEY);
      if (payload) {
        const conductor = await conductorModel.findOne({ id: payload.payload });
        req.id = conductor.id;
        next();
      }
    } else {
      const client = req.get("User-Agent");
      if (client.includes("Mozilla") == true) {
      }
      res.json({
        message: "Please Login",
      });
    }
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

module.exports.conductorLogout = async function conductorLogout(req, res) {
  res.cookie("conductorLogin", "", { maxAge: 1 });
  res.json({
    message: "conductor logged out successfully",
  });
};
