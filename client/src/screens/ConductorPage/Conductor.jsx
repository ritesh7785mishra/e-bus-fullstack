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
  const [name, setName] = useState("conductorName");
  const [id, setId] = useState("Conductor id");
  const [currentRoute, setCurrentRoute] = useState("");
  const [fullBtn, setFullBtn] = useState(false);
  const [standingBtn, setStandingBtn] = useState(false);
  const [emptySeatsBtn, setEmptySeatsBtn] = useState(true);
  const [shareLocationBtn, setShareLocationBtn] = useState(false);
  const [stopLocationBtn, setStopLocationBtn] = useState(false);
  const {
    currentConductor,
    setCurrentConductor,
    getConductorProfile,
    setConductorLoggedIn,
  } = useContext(Context);

  console.log(currentRoute);

  const routeOptions = [
    "SanjeevNagar-Tatmil-Rawatpur-IIT",
    "IIT-Rawatpur-Tatmil-SanjeevNagar",
    "SanjeevNagar-Rania",
    "Rania-SanjeevNagar",
    "SanjeevNagar-Ghantaghar-Nankari",
    "SanjeevNagar-Jajmau-Bithoor",
    "Bithoor-Jajmau-SanjeevNagar",
    "Ramaipur-SanjeevNagar",
    "SanjeevNagar-Ramaipur",
    "SanjeevNagar-SainikChauraha",
    "SainikChauraha-SanjeevNagar",
  ];

  useEffect(() => {
    if (localStorage.getItem("conductorAuthToken")) {
      getConductorProfile();
    }
  }, []);

  useEffect(() => {
    if (currentConductor) {
      setName(currentConductor.name);
      setId(currentConductor.conductorId);
    }
  }, [currentConductor]);

  useEffect(() => {
    // function to send position to the mongodb location database.
    const sendPosition = () => {
      navigator.geolocation.getCurrentPosition(async function (position) {
        let { latitude } = position.coords;
        let { longitude } = position.coords;

        fetch(`http://localhost:3000/conductor/update-location`, {
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
    console.log("This is Seat status update function", data);
  };

  const updateCurrentRoute = async (currentRoute) => {
    try {
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

      const data = await res.json();
      if (data) {
        console.log(data);
      }
    } catch (error) {
      console.log(error.messag);
    }
  };

  return (
    <div className="conductorBox">
      <div className="nameAndId">
        <div className="conductorName">
          <AccountCircleIcon fontSize="large" />
          <h3 className="nameHead">{name}</h3>
        </div>
        <div className="conductorId">
          <p className="idHead">{id}</p>
          <BadgeIcon fontSize="large" />
        </div>
      </div>

      <Stack spacing={5}>
        <div className="searchBar">
          <h2>Select Your Current Route</h2>

          <Autocomplete
            disablePortal
            id="combo-box-demo"
            value={currentRoute}
            onChange={(e, newValue) => {
              setCurrentRoute(newValue);
              updateCurrentRoute(currentRoute);
            }}
            // inputValue={route}
            // onInputChange={(e, newValue) => {
            //   setRoute(newValue);
            // }}
            options={routeOptions}
            sx={{ width: "100%", margin: "2 auto" }}
            renderInput={(params) => (
              <TextField {...params} label="Select Route" size="small" />
            )}
          />
        </div>

        <Stack spacing={2}>
          {currentRoute ? (
            <Button
              onClick={() => {
                setShareLocationBtn(true);
                setStopLocationBtn(false);
                updateCurrentRoute(currentRoute);
              }}
              sx={{ alignSelf: "center" }}
              startIcon={<ShareLocationIcon fontSize="large" />}
              variant={shareLocationBtn ? "contained" : "outlined"}
              className="locationSharing"
            >
              Start Sharing Location
            </Button>
          ) : (
            <Button
              variant="outlined"
              className="locationSharing"
              sx={{ alignSelf: "center" }}
              disabled
              startIcon={<ShareLocationIcon fontSize="large" />}
            >
              Start Sharing location
            </Button>
          )}

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
            localStorage.removeItem("conductorAuthToken");
            setCurrentConductor({});
            setConductorLoggedIn(false);
            navigate("/conductor-login");
          }}
          variant="contained"
          color="warning"
        >
          Logout
        </Button>
      </Stack>
    </div>
  );
}

export default Conductor;
