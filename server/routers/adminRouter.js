const express = require("express");
const adminRouter = express.Router();

const {
  getAllConductor,
  addConductor,
  deleteConductor,
  updateConductor,
  getConductor,
} = require("../controllers/adminController");

//admin ke options

//for fetching all the conductors
adminRouter.route("/").get(getAllConductor);
//getting a single conductor
adminRouter.route("/:id").get(getConductor);
//adding conductor to the list
adminRouter.route("/").post(addConductor);

//delete conductor from the list
adminRouter.route("/:id").delete(deleteConductor);
//update conductor data.
adminRouter.route("/:id").patch(updateConductor);

module.exports = adminRouter;
