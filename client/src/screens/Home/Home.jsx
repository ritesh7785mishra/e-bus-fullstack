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
  const { currentUser, handleUserLogout } = useContext(Context);
  const { name } = currentUser.data;
  const { message } = currentUser;
  //Using useRef hook to get JS ability to add map to the react application because tom tom api doesn't work good with the react element.
  const mapElement = useRef();
  const [allLocationArray, setAllLocationArray] = useState([]);
  console.log("This is all Location Array", allLocationArray);

  const [map, setMap] = useState({});
  const [longitude, setLongitude] = useState(80);
  //26.423649620885715, 80.39904990500386
  const [latitude, setLatitude] = useState(27);

  // Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
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
    navigator.geolocation.getCurrentPosition(function (position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });

    async function fetchLocations() {
      const res = await fetch(`http://localhost:3000/user/all-buses`);
      const data = await res.json();

      if (data) {
        const allLocationData = data.data;
        console.log(data.data, "This is data. data");
        const newAllLocation = allLocationData.map(
          (location) => location.currentLocation
        );
        setAllLocationArray(newAllLocation);
      }
    }
    fetchLocations();

    let interval;

    // defines origin
    const origin = {
      lng: longitude,
      lat: latitude,
    };

    //this is destinations array which takes up all the location where delivery boy has to deliver items
    const destinations = [];

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
    const addMarker = () => {
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
    addMarker(); // add marker called to set the origin position.

    //this function is used to sort the locations to make the perfect route. *Still need to understand it perfectly*
    const sortDestinations = (locations) => {
      //converts locations to pointsfor destination.
      const pointsForDestinations = locations.map((destination) => {
        return convertToPoints(destination);
      });

      const callParameters = {
        key: apiKey,
        destinations: pointsForDestinations,
        origins: [convertToPoints(origin)],
      };

      return new Promise((resolve, reject) => {
        ttapi.services
          .matrixRouting(callParameters)
          .then((matrixAPIResults) => {
            const results = matrixAPIResults.matrix[0];
            const resultsArray = results.map((result, index) => {
              return {
                location: locations[index],
                drivingtime: result.response.routeSummary.travelTimeInSeconds,
              };
            });
            resultsArray.sort((a, b) => {
              return a.drivingtime - b.drivingtime;
            });
            const sortedLocations = resultsArray.map((result) => {
              return result.location;
            });
            resolve(sortedLocations);
          });
      });
    };

    //calculates and make routes.
    const recalculateRoutes = () => {
      sortDestinations(destinations).then((sorted) => {
        sorted.unshift(origin);

        ttapi.services
          .calculateRoute({
            key: apiKey,
            locations: sorted,
          })
          .then((routeData) => {
            const geoJson = routeData.toGeoJson();
            drawRoute(geoJson, map);
          });
      });
    };

    map.on("click", (e) => {
      //pushes lngLat from the map to the destinations folder
      console.log(e.lngLat);
      destinations.push(e.lngLat);
      //adds delivery point on the map
      addDeliveryMarker(e.lngLat, map);
      recalculateRoutes();
      console.log(destinations, "This is destinations array");
    });

    return () => map.remove();
  }, [longitude, latitude]);

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

  const addDeliveryMarker = (lngLat, map) => {
    const element = document.createElement("div");
    element.className = "marker-delivery";
    //make a new marker named element
    new tt.Marker({
      element: element,
    })
      .setLngLat(lngLat)
      .addTo(map);
  };

  allLocationArray.map((location) => {
    const lObj = {
      lat: location[1],
      lng: location[0],
    };
    addDeliveryMarker(lObj, map);
  });

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
          options={top10Routes}
          sx={{ width: "100%", margin: "2 auto" }}
          renderInput={(params) => (
            <TextField {...params} label="Select Route" size="small" />
          )}
        />
      </div>

      <Button onClick={() => allBusesLocation()}>get current location</Button>

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
