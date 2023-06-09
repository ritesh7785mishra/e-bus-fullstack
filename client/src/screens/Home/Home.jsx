import "./Home.css";
import React, { useEffect, useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import * as tt from "@tomtom-international/web-sdk-maps";
import * as ttapi from "@tomtom-international/web-sdk-services";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import Autocomplete from "@mui/material/Autocomplete";
import DepartureBoardIcon from "@mui/icons-material/DepartureBoard";
import companyLogo from "../../assets/company-logo.jpg";
import { AccountCircleOutlined } from "@mui/icons-material";
import { apiKey } from "../../util";
import { Context } from "../../Context";

function Home(props) {
  const navigate = useNavigate();
  const { currentUser, handleUserLogout, getUserProfile } = useContext(Context);
  const [currentRoute, setCurrentRoute] = useState("");

  const { name } = currentUser;

  //Using useRef hook to get JS ability to add map to the react application because tom tom api doesn't work good with the react element.
  const mapElement = useRef();
  const [allLocationArray, setAllLocationArray] = useState([]);

  const [map, setMap] = useState({});
  const [longitude, setLongitude] = useState(80);

  const [latitude, setLatitude] = useState(27);

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

  const locationObjArray = (locationData) => {
    const newAllLocation = locationData.map(
      (location) => location.currentLocation
    );
    setAllLocationArray(newAllLocation);
  };

  async function fetchLocations() {
    const res = await fetch(`http://localhost:3000/user/all-buses`);
    const data = await res.json();

    if (data) {
      const allLocationData = data.data;
      locationObjArray(allLocationData);
    }
  }

  useEffect(() => {
    getUserProfile();
    navigator.geolocation.getCurrentPosition(function (position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });

    //creates a map div. which is visible on the client side.
    let map = tt.map({
      key: apiKey,
      container: mapElement.current,

      //sets up what are the items you need to see on the map.
      stylesVisibility: {
        trafficIncidents: true,
        trafficFlow: true,
      },
      //center defines origin location of the person.
      center: [longitude, latitude],
      zoom: 14,
    });

    //setMap function sets up map state for the future use of the map.
    setMap(map);

    //this is the origin location I think
    const addUserCurrentPosition = () => {
      //creates a off set.
      const popupOffset = {
        bottom: [0, -25],
      };

      //creates  a popup to show
      const popup = new tt.Popup({ offset: popupOffset }).setHTML(
        "This is you!"
      );
      const element = document.createElement("div");
      element.className = "marker";

      //creates a marker for the origin position of the user.
      const marker = new tt.Marker({
        draggable: true,
        element: element,
      })
        .setLngLat([longitude, latitude])
        .addTo(map);

      //makes the user position draggable.
      marker.on("dragend", () => {
        const lngLat = marker.getLngLat();
        setLongitude(lngLat.lng);
        setLatitude(lngLat.lat);
      });

      //this I think to toggle the popup
      marker.setPopup(popup).togglePopup();
    };
    addUserCurrentPosition(); // add marker called to set the origin position.

    allLocationArray.map((location) => {
      const lObj = {
        lat: location[1],
        lng: location[0],
      };
      addDeliveryMarker(lObj, map);
    });

    return () => map.remove();
  }, [longitude, latitude, currentRoute]);

  //takes lng&Lat and converts it  to object named point which has properties latitude and longitude.
  const convertToPoints = (lngLat) => {
    // console.log("This is lngLat",lngLat)
    return {
      point: {
        latitude: lngLat.lat,
        longitude: lngLat.lng,
      },
    };
  };

  //helps in drawing the route, takes geoJson?= , map
  const drawRoute = (geoJson, map) => {
    if (map.getLayer("route")) {
      //removes previous routes
      map.removeLayer("route");
      map.removeSource("route");
    }
    map.addLayer({
      id: "route",
      type: "line",
      source: {
        type: "geojson",
        data: geoJson,
      },
      paint: {
        "line-color": "#4a90e2",
        "line-width": 6,
      },
    });
  };

  // addDeliveryMarker function add pointer on map on click. takes lngLat and map

  /* Get all buses locations and their Routes or instead of getting all the routes we can buses of only those routes which are choosen by the user
        filter buses basis on selected Routes.
        get location of filtered buses and map over it and addDeliveryMarker to ran over it, this should be on useEffect.
  */
  let busM;
  const addDeliveryMarker = (lngLat, map) => {
    const element = document.createElement("div");
    element.className = "marker-delivery";
    //make a new marker named element
    busM = new tt.Marker({
      element: element,
    })
      .setLngLat(lngLat)
      .addTo(map);
  };

  const fetchSelectedRouteBuses = async (route) => {
    try {
      const res = await fetch(
        `http://localhost:3000/user/route-selected-buses`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            route: route,
          }),
        }
      );

      const data = await res.json();

      if (data) {
        console.log(data.data);
        locationObjArray(data.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="homeBox">
      <div className="homeNavBar">
        <div className="logoContainer">
          <img src={companyLogo} alt="Company logo" />
        </div>
        <h3 className="homeTitle">Home</h3>
        <div className="homeUserName">
          <AccountCircleOutlined />
          <p className="userName">{name ? name : "User Name"}</p>
        </div>
      </div>

      <div className="searchBar">
        <h2>Where to?</h2>

        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={routeOptions}
          value={currentRoute}
          onChange={(e, newValue) => {
            setCurrentRoute(newValue);
            fetchSelectedRouteBuses(newValue);
          }}
          sx={{ width: "100%", margin: "2 auto" }}
          renderInput={(params) => (
            <TextField {...params} label="Select Route" size="small" />
          )}
        />
      </div>

      <Button onClick={() => fetchLocations()}>get current location</Button>

      <Button
        onClick={() => {
          map.busM.remove();
        }}
      >
        Remove all icons{" "}
      </Button>

      <div ref={mapElement} className="busMap" />
      <Button
        onClick={() => {
          handleUserLogout();
          navigate("/");
        }}
        variant="contained"
        color="error"
      >
        Logout
      </Button>
    </div>
  );
}

export default Home;
