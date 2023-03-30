//form validation is still pending

import React from "react";
import { Box, Stack, TextField, Checkbox, Button } from "@mui/material";
import "./SignUp.css";
import { useState, useContext } from "react";
import { Context } from "../../Context";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const { postUser } = useContext(Context);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { name, email, password, confirmPassword } = userData;
  // console.log(userData, "This is user data ");
  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <Box className="formBox">
      <h1 className="signupHead">Sign Up</h1>
      <p>Please fill in this form to create an account</p>
      <hr></hr>
      <Stack spacing={2}>
        <TextField
          value={name}
          name="name"
          size="small"
          label="Name"
          variant="outlined"
          onChange={handleChange}
        ></TextField>

        <TextField
          value={email}
          name="email"
          size="small"
          label="Email"
          variant="outlined"
          onChange={handleChange}
        ></TextField>
        <TextField
          value={password}
          name="password"
          size="small"
          label="Password"
          variant="outlined"
          onChange={handleChange}
        ></TextField>
        <TextField
          value={confirmPassword}
          name="confirmPassword"
          size="small"
          label="Confirm Password"
          variant="outlined"
          onChange={handleChange}
        ></TextField>
        <Stack direction="row">
          <Checkbox></Checkbox>
          <p>
            I accept the <a href="#">Terms of Use</a> &{" "}
            <a href="#">Privacy Policy</a>
          </p>
        </Stack>
        <Stack alignItems="center">
          <Button
            onClick={() => {
              postUser(userData);
              navigate("/");
            }}
            variant="contained"
            sx={{
              borderRadius: "15px",
            }}
          >
            Sign Up
          </Button>
        </Stack>
        <p>
          Already have an account?{" "}
          <a
            onClick={() => {
              navigate("/");
            }}
          >
            <Button
              variant="contained"
              sx={{
                fontSize: "0.8rem",
                marginLeft: "0.5rem",
              }}
            >
              {" "}
              Login Here
            </Button>
          </a>
        </p>
      </Stack>
    </Box>
  );
}
