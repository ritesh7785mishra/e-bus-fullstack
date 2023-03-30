import React, { useEffect, useState, useContext } from "react";
import "./AllConductors.css";

import Card from "./Card";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { Button } from "@mui/material";
import { Context } from "../../Context";

function AllConductors() {
  const navigate = useNavigate();
  const { allConductors, fetchConductors } = useContext(Context);

  useEffect(() => {
    fetchConductors();
  }, []);

  const cardElements =
    allConductors.length >= 0 &&
    allConductors.map((conductor) => (
      <Card
        key={conductor.id}
        id={conductor.id}
        name={conductor.name}
        conductorId={conductor.properties.conductorId}
      ></Card>
    ));
  return (
    <div className="formBox allConductorBox">
      <div className="buttonHome">
        <Button
          variant="contained"
          onClick={() => {
            navigate("/admin");
          }}
        >
          Add Conductor
        </Button>
        <IconButton
          color="warning"
          className="homeBtn"
          onClick={() => {
            navigate("/");
          }}
        >
          <HomeIcon />
        </IconButton>
      </div>
      <div className="cardContainer">{cardElements}</div>
    </div>
  );
}

export default AllConductors;
