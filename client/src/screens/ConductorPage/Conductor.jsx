import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Conductor.css";
import BadgeIcon from "@mui/icons-material/Badge";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LocationOffIcon from "@mui/icons-material/LocationOff";
import ShareLocationIcon from "@mui/icons-material/ShareLocation";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";

import { Context } from "../../Context";

function Conductor() {
  const navigate = useNavigate();
  const [fullBtn, setFullBtn] = useState(false);
  const [standingBtn, setStandingBtn] = useState(false);
  const [emptySeatsBtn, setEmptySeatsBtn] = useState(true);
  const [shareLocationBtn, setShareLocationBtn] = useState(false);
  const [stopLocationBtn, setStopLocationBtn] = useState(false);
  const { currentConductor, setCurrentConductor, conductorLoggedIn } =
    useContext(Context);

  const top10Routes = [
    { label: "SanjeevNagar-Tatmil-Rawatpur-IIT" },
    { label: "IIT-Rawatpur-Tatmil-SanjeevNagar" },
    { label: "SanjeevNagar-Rania" },
    { label: "Rania-SanjeevNagar" },
    { label: "SanjeevNagar-Ghantaghar-Nankari" },
    { label: "SanjeevNagar-Jajmau-Bithoor" },
    { label: "Bithoor-Jajmau-SanjeevNagar" },
    { label: "Ramaipur-SanjeevNagar" },
    { label: "SanjeevNagar-Ramaipur" },
    { label: "SanjeevNagar-SainikChauraha" },
    { label: "SainikChauraha-SanjeevNagar" },
  ];

  useEffect(() => {
    // function to send position to the mongodb location database.
    const sendPosition = () => {
      navigator.geolocation.getCurrentPosition(async function (position) {
        let { latitude } = position.coords;
        let { longitude } = position.coords;

        fetch(`http://localhost:3000/conductor/updateLocation`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: currentConductor.id,
            longlat: [longitude, latitude],
          }),
        })
          .then((res) => res.json())
          .then((data) => console.log(data.data, "Send location function ran"))
          .catch((error) => console.log(error));
      });
    };
    let interval;
    if (shareLocationBtn) {
      interval = setInterval(sendPosition, 2000);
    }

    if (stopLocationBtn) {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [shareLocationBtn, stopLocationBtn]);

  const updateSeatStatus = async (seatStatus) => {
    const res = await fetch(
      `http://localhost:3000/conductor/update-seat-status`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          seatStatus: seatStatus,
          id: currentConductor.id,
        }),
      }
    );

    const data = await res.json();
    console.log(data, "This is Seat status update function");
  };

  const updateCurrentRoute = async (currentRoute) => {
    const res = await fetch(
      `http://localhost:3000/conductor/update-current-route`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentRoute: currentRoute,
          id: currentConductor.id,
        }),
      }
    );
  };

  const page = () => {
    return (
      <div className="conductorBox">
        <div className="nameAndId">
          <div className="conductorName">
            <AccountCircleIcon fontSize="large" />
            <h3 className="nameHead">
              {currentConductor.name ? currentConductor.name : "Conductor Name"}
            </h3>
          </div>
          <div className="conductorId">
            <p className="idHead">
              {currentConductor.properties.conductorId
                ? currentConductor.properties.conductorId
                : 123456}
            </p>
            <BadgeIcon fontSize="large" />
          </div>
        </div>

        <Stack spacing={5}>
          <div className="searchBar">
            <h2>Select Your Current Route</h2>

            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={top10Routes}
              sx={{ width: "100%", margin: "2 auto" }}
              renderInput={(params) => (
                <TextField {...params} label="Select Route" size="small" />
              )}
            />
          </div>

          <Stack spacing={2}>
            <Button
              onClick={() => {
                setShareLocationBtn(true);
                setStopLocationBtn(false);
              }}
              sx={{ alignSelf: "center" }}
              startIcon={<ShareLocationIcon fontSize="large" />}
              variant={shareLocationBtn ? "contained" : "outlined"}
              className="locationSharing"
            >
              Start Sharing Location
            </Button>
            <Button
              onClick={() => {
                setShareLocationBtn(false);
                setStopLocationBtn(true);
              }}
              sx={{ alignSelf: "center" }}
              startIcon={<LocationOffIcon fontSize="large" />}
              variant={stopLocationBtn ? "contained" : "outlined"}
              className="locationSharing"
              color="error"
            >
              Stop Sharing Location
            </Button>
          </Stack>

          <Stack spacing={3} direction="row">
            <Button
              onClick={() => {
                setFullBtn(true);
                updateSeatStatus("Full");
                setStandingBtn(false);
                setEmptySeatsBtn(false);
              }}
              className="spaceIndicationButton"
              variant={fullBtn ? "contained" : "outlined"}
              color="error"
            >
              Full
            </Button>
            <Button
              onClick={() => {
                setFullBtn(false);
                setStandingBtn(true);
                updateSeatStatus("Standing-Space");
                setEmptySeatsBtn(false);
              }}
              className="spaceIndicationButton"
              variant={standingBtn ? "contained" : "outlined"}
              color="primary"
            >
              Standing Space
            </Button>
            <Button
              onClick={() => {
                setFullBtn(false);
                setStandingBtn(false);
                setEmptySeatsBtn(true);
                updateSeatStatus("Empty");
              }}
              className="spaceIndicationButton"
              variant={emptySeatsBtn ? "contained" : "outlined"}
              color="success"
            >
              Empty Seats
            </Button>
          </Stack>

          <Button
            onClick={() => {
              navigate("/conductor-login");
              setCurrentConductor({});
            }}
            variant="contained"
            color="warning"
          >
            Logout
          </Button>
        </Stack>
      </div>
    );
  };

  return currentConductor ? page() : <h1>Please Login...</h1>;
}

export default Conductor;
