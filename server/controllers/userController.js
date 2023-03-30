const locationModel = require("../models/locationModel");
const userModel = require("../models/userModel");

module.exports.getUser = async function getUser(req, res) {
  let id = req.id;
  let user = await userModel.findById(id);

  if (user) {
    res.json(user);
  } else {
    res.json({
      message: "user not found",
    });
  }
};

module.exports.updateUser = async function updateUser(req, res) {
  try {
    //updated data in users object
    let id = req.params.id;
    let user = await userModel.findById(id);
    let dataToBeUpdated = req.body;
    if (user) {
      const keys = [];
      for (let key in dataToBeUpdated) {
        keys.push(key);
      }

      for (let i = 0; i < keys.length; i++) {
        user[keys[i]] = dataToBeUpdated[keys[i]];
      }
      const updatedData = await user.save(); //
      res.json({
        message: "data updated successfully",
        updatedData: updatedData,
      });
    } else {
      res.json({
        message: "user not found",
      });
    }
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

module.exports.deleteUser = async function deleteUser(req, res) {
  try {
    let id = req.params.id;
    let user = await userModel.findByIdAndDelete(id);
    if (user) {
      return res.json({
        message: "data deleted successfully",
        data: user,
      });
    } else {
      return res.json({
        message: "user not found",
      });
    }
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};

module.exports.getAllBuses = async function getAllBuses(req, res) {
  try {
    let buses = await locationModel.find();
    if (buses) {
      res.json({
        message: "All active buses retreived successfully",
        data: buses,
      });
    } else {
      res.json({
        message: "no buses found",
      });
    }
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

module.exports.routeSelectedBuses = async function routeSelectedBuses(
  req,
  res
) {
  try {
    let { route } = req.body;
    let allSelectedBuses = await locationModel.find({ currentRoute: route });
    if (allSelectedBuses) {
      res.json({
        message: "buses retreived successfully",
        data: allSelectedBuses,
      });
    } else {
      res.json({
        message: "not able to find buses",
      });
    }
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};
