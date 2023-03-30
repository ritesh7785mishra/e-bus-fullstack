import "./SignIn.css";
import React, { useState, useContext } from "react";

import { Box, Stack, InputAdornment, Button, IconButton } from "@mui/material";
import { TextField } from "@mui/material";
import MarkunreadOutlinedIcon from "@mui/icons-material/MarkunreadOutlined";
import LockPersonOutlinedIcon from "@mui/icons-material/LockPersonOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from "@mui/icons-material/Google";
import { useNavigate } from "react-router-dom";
import { Context } from "../../Context";
import companyLogo from "../../assets/company-logo.jpg";
import ImageGrid from "../../components/ImageGrid/ImageGrid";

function SignIn() {
  const navigate = useNavigate();
  const { getUserProfile } = useContext(Context);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [showPass, setShowPass] = useState(false);
  const [warning, setWarning] = useState(false);
  const { email, password } = loginData;
  const handleChange = (e) => {
    setWarning(false);
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const validation = async () => {
    if (email == "" || password == "") {
      setWarning(true);
    } else if (
      email == "ritesh7785mishra@gmail.com" &&
      password == "@123Ritesh"
    ) {
      navigate("/all-conductors");
    } else {
      const res = await getUserProfile(loginData).then(() => navigate("/home"));
    }
  };

  // <div>
  //   <div>
  //     <BusNavbar />
  //   </div>
  //   <Box className="">
  //     <Box>
  //       <div className="title">
  //         <h1 className="tracking-in-expand ">Welcome to Savari.com</h1>
  //         <div className="logoContainer">
  //           <img src={companyLogo} alt="Company logo" />
  //         </div>
  //       </div>
  //     </Box>

  //     <Box>
  //       <h1>Please Login</h1>
  //       <Stack spacing={3}>
  //         <TextField
  //           size="small"
  //           variant="standard"
  //           label="Email"
  //           name="email"
  //           value={email}
  //           onChange={handleChange}
  //           placeholder="Enter your email"
  //           InputProps={{
  //             startAdornment: (
  //               <InputAdornment position="start">
  //                 <MarkunreadOutlinedIcon />
  //               </InputAdornment>
  //             ),
  //           }}
  //         ></TextField>
  //         <TextField
  //           size="large"
  //           type={showPass ? "text" : "password"}
  //           name="password"
  //           value={password}
  //           onChange={handleChange}
  //           variant="standard"
  //           label="Password"
  //           placeholder="Enter your password"
  //           InputProps={{
  //             startAdornment: (
  //               <InputAdornment position="start">
  //                 <LockPersonOutlinedIcon />
  //               </InputAdornment>
  //             ),
  //             endAdornment: (
  //               <InputAdornment position="end">
  //                 <IconButton
  //                   aria-label="toggle password visibility"
  //                   onClick={() => setShowPass((preVal) => !preVal)}
  //                   edge="end"
  //                 >
  //                   {showPass ? <VisibilityOff /> : <Visibility />}
  //                 </IconButton>
  //               </InputAdornment>
  //             ),
  //           }}
  //         ></TextField>
  //         <p className="forgetPassword">Forget Password ?</p>
  //         {
  //           <p
  //             className="warning"
  //             style={{ visibility: warning ? "visible" : "hidden" }}
  //           >
  //             Please fill email and password
  //           </p>
  //         }
  //         <button
  //           className="loginBtn"
  //           onClick={() => {
  //             validation();
  //           }}
  //         >
  //           LOGIN
  //         </button>
  //         <button
  //           className="loginBtn"
  //           onClick={() => navigate("./conductor-login")}
  //         >
  //           CONDUCTOR LOGIN
  //         </button>

  //         {/* <Stack>
  //         <p>Or sign in Using</p>
  //         <Stack
  //           className="iconStack"
  //           direction="row"
  //           justifyContent="center"
  //           spacing={2}
  //         >
  //           <IconButton size="large" color="primary">
  //             <FacebookOutlinedIcon />
  //           </IconButton>
  //           <IconButton size="large" color="primary">
  //             <TwitterIcon />
  //           </IconButton>
  //           <IconButton size="large" color="warning">
  //             <GoogleIcon />
  //           </IconButton>
  //         </Stack>
  //       </Stack> */}

  //         <p className="signUpHead">Or Sign Up Using</p>
  //         <Button
  //           onClick={() => {
  //             navigate("/signup");
  //           }}
  //         >
  //           SIGN UP
  //         </Button>
  //       </Stack>
  //     </Box>
  //   </Box>
  // </div>

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <ImageGrid></ImageGrid>
      <Box
        className="formBox"
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            alignSelf: "center",
          }}
        >
          <h1 className="heading">Please Login</h1>
          <Stack spacing={3}>
            <TextField
              size="small"
              variant="standard"
              label="Email"
              name="email"
              value={email}
              onChange={handleChange}
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
              type={showPass ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleChange}
              variant="standard"
              label="Password"
              placeholder="Enter your password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockPersonOutlinedIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPass((preVal) => !preVal)}
                      edge="end"
                    >
                      {showPass ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            ></TextField>
            <p className="forgetPassword">Forget Password ?</p>
            {
              <p
                className="warning"
                style={{ visibility: warning ? "visible" : "hidden" }}
              >
                Please fill email and password
              </p>
            }
            <button
              className="loginBtn"
              onClick={() => {
                validation();
              }}
            >
              LOGIN
            </button>
            <button
              className="loginBtn"
              onClick={() => navigate("./conductor-login")}
            >
              CONDUCTOR LOGIN
            </button>

            {/* <Stack>
          <p>Or sign in Using</p>
          <Stack
            className="iconStack"
            direction="row"
            justifyContent="center"
            spacing={2}
          >
            <IconButton size="large" color="primary">
              <FacebookOutlinedIcon />
            </IconButton>
            <IconButton size="large" color="primary">
              <TwitterIcon />
            </IconButton>
            <IconButton size="large" color="warning">
              <GoogleIcon />
            </IconButton>
          </Stack>
        </Stack> */}

            {/* <p className="signUpHead">Or Sign Up Using</p> */}
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                navigate("/signup");
              }}
              sx={{
                width: "200px",
                borderRadius: "50px",
                alignSelf: "center",
              }}
            >
              SIGN UP
            </Button>
          </Stack>
        </Box>
      </Box>
    </div>
  );
}

export default SignIn;
