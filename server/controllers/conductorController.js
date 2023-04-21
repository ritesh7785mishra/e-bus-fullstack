const conductorModel = require("../models/conductorModel");
const locationModel = require("../models/locationModel");
const jwt = require("jsonwebtoken");
const { apiKey, adminKey, baseUrl, JWT_KEY } = process.env;

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
      console.log("This function called,", payload.payload);
      console.log("This is founded conductor", conductor);
      res.json({
        name: conductor.name,
        conductorId: conductor.properties.conductorId,
        id: conductor.id,
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

//get the updated Route by the conductor
module.exports.updateConductorRoute = async function updateConductorRoute(
  req,
  res
) {
  try {
    const { id, currentRoute } = req.body;

    const updateRoute = await locationModel.findOneAndUpdate(
      { id: id },
      { $set: { currentRoute: currentRoute } },
      { new: true }
    );

    if (updateRoute) {
      res.json({
        message: "updated Route successfully",
        data: updateRoute,
      });
    } else {
      res.json({
        message: "not able to update Route",
      });
    }
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

//get current location of the conductor
module.exports.addCurrentLocation = async function addCurrentLocation(
  req,
  res
) {
  try {
    const { id, longlat } = req.body;
    const updateRoute = await locationModel.findOneAndUpdate(
      { id: id },
      { $set: { currentLocation: longlat } },
      { new: true }
    );

    if (updateRoute) {
      res.json({
        message: "route updated Successfully",
        data: updateRoute,
      });
    } else {
      res.json({
        message: "not able to update route in locationModel",
      });
    }
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

//udpate seatStatus
module.exports.seatStatusUpdate = async function seatStatusUpdate(req, res) {
  try {
    const seatStatus = req.body.seatStatus;
    const id = req.body.id;
    const updateSeatStatus = await locationModel.findOneAndUpdate(
      { id: id },
      { $set: { seatStatus: seatStatus } },
      { new: true }
    );

    if (updateSeatStatus) {
      res.json("Seat Status updated Successfully");
    } else {
      res.json("Not able to update seat status");
    }
  } catch (error) {
    res.json(error.message);
  }
};

//signout from the location service
