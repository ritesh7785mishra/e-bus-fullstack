const conductorModel = require("../models/conductorModel");
const { apiKey, adminKey, baseUrl } = process.env;
const axios = require("axios");
const locationModel = require("../models/locationModel");

//adding conductor to the list
module.exports.addConductor = async function addConductor(req, res) {
  try {
    let dataObj = req.body;

    const response = await fetch(
      `https://api.tomtom.com/locationHistory/1/objects/object?key=${apiKey}&adminKey=${adminKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataObj),
      }
    );

    const data = await response.json();

    console.log(data);

    if (data) {
      let conductor = await conductorModel.create(data);
      let locationData = await locationModel.create({ id: data.id });

      if (conductor) {
        res.json({
          message: "Conductor Added Successfully",
          data: conductor,
          location: locationData,
        });
      } else {
        res.json({
          message: "Not able to create conductor in conductorModel",
        });
      }
    } else {
      res.json({
        message: "not able to create conductor in tom tom api",
      });
    }
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

//get a conductor data
module.exports.getConductor = async function getConductor(req, res) {
  const id = req.params.id;
  try {
    let conductor = await conductorModel.find({ id: id });
    console.log(conductor);

    if (conductor) {
      res.json({
        message: "conductor retreived successfully",
        data: conductor,
      });
    } else {
      res.json({
        message: "conductor details not found",
      });
    }
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

//deleting a conductor.
module.exports.deleteConductor = async function deleteConductor(req, res) {
  try {
    const id = req.params.id;

    const response = await fetch(
      `https://${baseUrl}/locationHistory/1/objects/${id}?key=${apiKey}&adminKey=${adminKey}`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();

    if (data) {
      const deletedConductor = await conductorModel.findOneAndDelete({
        id: id,
      });

      const deletedLocation = await locationModel.findOneAndDelete({
        id: id,
      });

      if (deletedConductor) {
        res.json({
          message: "conductor deleted Successfully",
          data: deletedConductor,
          lastLocation: deletedLocation,
        });
      } else {
        res.json({
          message: "conductor not found",
        });
      }
    }
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

//updating conductor data
//in update section only add properties.
module.exports.updateConductor = async function updateConductor(req, res) {
  try {
    const updatedData = req.body;
    let id = req.params.id;
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    };
    const response = await fetch(
      `https://${baseUrl}/locationHistory/1/objects/${id}?key=${apiKey}&adminKey=${adminKey}`,
      requestOptions
    );
    const data = await response.json();

    if (data) {
      const updatedDataInMongoDb = await conductorModel.findOneAndUpdate(
        { id: id },
        { ...updatedData },
        { new: true }
      );

      res.json({
        message: "data updated Successfully",
        data: updatedDataInMongoDb,
      });
    } else {
      res.json({
        message: "id not found in mongoDb",
      });
    }
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

//getting all the conductors
module.exports.getAllConductor = async function getAllConductor(req, res) {
  try {
    let allConductors = await conductorModel.find();
    if (allConductors) {
      res.json({
        message: "All conductors data retreived Successfully",
        data: allConductors,
      });
    } else {
      res.json({
        message: "conductors not found",
      });
    }
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};
