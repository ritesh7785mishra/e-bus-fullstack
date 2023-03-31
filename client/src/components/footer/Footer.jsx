import "./Footer.css";
import { Stack, Button } from "@mui/material";
import companyLogo from "../../assets/company-logo.jpg";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

import React from "react";

const Footer = () => {
  return (
    <Stack
      direction="column"
      //   sx={{
      //     borderRadius: "15px",
      //     margin: "1em",
      //     boxShadow: "3px 6px 32px 0px rgba(136, 136, 136, 0.39)",
      //     padding: "0.5em",
      //   }}
      className="shadow"
      spacing={2}
    >
      <Stack
        direction="row"
        spacing={3}
        alignItems="center"
        justifyContent="space-between"
      >
        <div className="footerImage">
          <img src={companyLogo} alt="" />
        </div>

        <Stack spacing={3} direction="row" alignItems="center">
          <WhatsAppIcon />
          <LinkedInIcon />
          <InstagramIcon />
          <FacebookIcon />
          <Stack direction="row" alignItems="center">
            <Button>Contact Us</Button>
            <ContactMailIcon />
          </Stack>
        </Stack>
      </Stack>
      <Stack direction="row">
        <div> "All Rights Reserved."</div>
        <Stack></Stack>
      </Stack>
    </Stack>
  );
};

export default Footer;
