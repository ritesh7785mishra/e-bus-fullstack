const express = require("express");
const {
  userSignup,
  userLogin,
  userProtectRoute,
  userLogout,
} = require("../controllers/userAuthController");

const {
  getUser,
  updateUser,
  deleteUser,
  routeSelectedBuses,
  getAllBuses,
} = require("../controllers/userController");

const userRouter = express.Router();

userRouter.route("/user-signup").post(userSignup);
userRouter.route("/user-login").post(userLogin);
userRouter.route("/all-buses").get(getAllBuses);
userRouter.route("/route-selected-buses").get(routeSelectedBuses);
userRouter.route("/profile/:id").patch(updateUser).delete(deleteUser);
userRouter.route("/logout").get(userLogout);
// userRouter.use(userProtectRoute);
userRouter.route("/user-profile").post(getUser);

module.exports = userRouter;
