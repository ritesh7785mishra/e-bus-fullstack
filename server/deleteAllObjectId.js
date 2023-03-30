require("dotenv").config();
const conductorModel = require("../server/models/conductorModel");
const locationModel = require("../server/models/locationModel");

const { baseUrl, apiKey, adminKey } = process.env;
const objects = [
  {
    id: "0bec8ab6-ec19-4e5d-bbfa-95b9ab0d6c56",
    name: "Nobita Nobi",
  },
  {
    id: "8e7d07c6-11ce-401a-b8f1-17427f241ebd",
    name: "ShizukaMinamoto",
  },
  {
    id: "000e64f6-d544-4727-b2ff-5c1b1320ef65",
    name: "Suneo",
  },
];

(async function deleteAllObject() {
  objects.map(async (object) => {
    console.log("I am running");
    const response = await fetch(
      `https://${baseUrl}/locationHistory/1/objects/${object.id}?key=${apiKey}&adminKey=${adminKey}`,
      {
        method: "DELETE",
      }
    ).then(async () => {
      await conductorModel.deleteMany({});
      await locationModel.deleteMany({});
    });
  });
})();
