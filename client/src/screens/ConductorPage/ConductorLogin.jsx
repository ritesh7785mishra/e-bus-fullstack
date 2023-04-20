import React, { useState, useContext, useEffect } from "react";
import { Box, Stack, InputAdornment } from "@mui/material";
import { TextField } from "@mui/material";
import MarkunreadOutlinedIcon from "@mui/icons-material/MarkunreadOutlined";
import LockPersonOutlinedIcon from "@mui/icons-material/LockPersonOutlined";
import { useNavigate } from "react-router-dom";
import { Context } from "../../Context";

function ConductorLogin() {
  const navigate = useNavigate();
  const { handleConductorLogin } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem("conductorAuthToken")) {
      navigate("/conductor");
    }
  }, []);

  const [conductorLogin, setConductorLogin] = useState({
    email: "",
    password: "",
  });
  const { email, password } = conductorLogin;

  const handleChange = (e) => {
    setConductorLogin({
      ...conductorLogin,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="formBox">
      <Box>
        <h1>Conductor Login</h1>
        <Stack spacing={3}>
          <TextField
            size="small"
            value={email}
            name="email"
            onChange={handleChange}
            variant="standard"
            label="Email"
            placeholder="Enter your email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MarkunreadOutlinedIcon />
                </InputAdornment>
              ),
            }}
          ></TextField>
          <TextField
            size="large"
            type="password"
            variant="standard"
            value={password}
            name="password"
            onChange={handleChange}
            label="Password"
            placeholder="Enter your password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockPersonOutlinedIcon />
                </InputAdornment>
              ),
            }}
          ></TextField>
          <p className="forgetPassword">Forget Password ?</p>
          <button
            className="loginBtn"
            onClick={async () => {
              handleConductorLogin(conductorLogin).then(navigate("/conductor"));
            }}
          >
            LOGIN
          </button>
          <button
            className="loginBtn"
            onClick={() => {
              navigate("/");
            }}
          >
            Return to customer login
          </button>
        </Stack>
      </Box>
    </div>
  );
}

export default ConductorLogin;
