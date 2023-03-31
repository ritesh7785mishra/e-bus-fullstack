import { Stack } from "@mui/material";
import "./Header.css";
import companyLogo from "../../assets/company-logo.jpg";

import React from "react";

const Header = () => {
  return (
    <Stack
      direction="row header"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        borderRadius: "15px",
        margin: "1em",
        boxShadow: "3px 6px 32px 0px rgba(136, 136, 136, 0.39)",
      }}
    >
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{
          height: "4.5em",
          marginLeft: "1em",
        }}
        spacing={3}
      >
        <div>
          <img src={companyLogo} alt="" className="headerImage" />
        </div>

        <h1>Savari.com</h1>
      </Stack>
    </Stack>
  );
};

export default Header;
