import { Button, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import "./Admin.css";
import { Stack } from "@mui/system";

import { useNavigate } from "react-router-dom";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { IconButton } from "@mui/material";
import { Context } from "../../Context";
import { useContext } from "react";

function Admin() {
  const navigate = useNavigate();
  const { handleAddConductor, fetchConductors } = useContext(Context);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState();

  const [userProperties, setUserProperties] = useState({
    phoneNumber: "",
    email: "",
    aadharNumber: "",
    conductorId: "",
    address: "",

    district: "",
    state: "",

    country: "India",
    password: "",
    confirmPassword: "",
    profileImage: "img/users/default.jpeg",
  });

  const {
    phoneNumber,
    email,
    aadharNumber,
    conductorId,
    address,

    district,
    state,

    country,
    password,
    confirmPassword,
  } = userProperties;

  function handleChange(e) {
    setUserProperties({
      ...userProperties,
      [e.target.name]: e.target.value,
    });
  }

  function handleNameChange(e) {
    setUserName(e.target.value);
  }

  async function handleSubmit() {
    let userObj = { name: userName, properties: { ...userProperties } };
    handleAddConductor(userObj)
      .then(() => fetchConductors())
      .then(() => {
        navigate("/all-conductors");
      });
  }

  return (
    <div className="formBox">
      <div className="heading">
        <h1>Admin</h1>
        <IconButton
          color="primary"
          onClick={() => {
            navigate("/all-conductors");
          }}
        >
          <KeyboardReturnIcon />
        </IconButton>
      </div>

      <Stack spacing={2}>
        <TextField
          value={userName}
          name="name"
          onChange={(e) => handleNameChange(e)}
          label="Name"
          variant="outlined"
          size="small"
        ></TextField>
        <TextField
          value={phoneNumber}
          name="phoneNumber"
          onChange={(e) => handleChange(e)}
          label="Phone Number"
          variant="outlined"
          size="small"
        ></TextField>
        <TextField
          value={email}
          name="email"
          onChange={(e) => handleChange(e)}
          label="Email"
          variant="outlined"
          size="small"
        ></TextField>
        <TextField
          value={aadharNumber}
          name="aadharNumber"
          onChange={(e) => handleChange(e)}
          label="Aadhar Number"
          variant="outlined"
          size="small"
        ></TextField>
        <TextField
          value={conductorId}
          name="conductorId"
          onChange={(e) => handleChange(e)}
          label="Conductor ID"
          variant="outlined"
          size="small"
        ></TextField>
        <hr></hr>

        <h3 className="addressHeadline">Address</h3>
        <TextField
          value={address}
          name="address"
          onChange={(e) => handleChange(e)}
          label="Full Address"
          variant="outlined"
          size="small"
        ></TextField>

        <TextField
          value={district}
          name="district"
          onChange={(e) => handleChange(e)}
          label="District"
          variant="outlined"
          size="small"
        ></TextField>

        <TextField
          value={state}
          name="state"
          onChange={(e) => handleChange(e)}
          label="State"
          variant="outlined"
          size="small"
        ></TextField>

        <TextField
          value={country}
          name="country"
          onChange={(e) => handleChange(e)}
          label="Country"
          variant="outlined"
          size="small"
        ></TextField>
        <TextField
          value={password}
          name="password"
          onChange={(e) => handleChange(e)}
          label="Password"
          variant="outlined"
          size="small"
        ></TextField>
        <TextField
          value={confirmPassword}
          name="confirmPassword"
          onChange={(e) => handleChange(e)}
          label="Confirm Password"
          variant="outlined"
          size="small"
        ></TextField>

        <Button onClick={handleSubmit} variant="contained">
          Add Details to Server
        </Button>
      </Stack>
    </div>
  );
}

export default Admin;
