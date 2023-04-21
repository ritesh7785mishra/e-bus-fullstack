import React, { useState, useEffect } from "react";

import AbortController from "abort-controller";

const Context = React.createContext();

function ContextProvider({ children }) {
  const [allConductors, setAllConductors] = useState([]);
  const [currentConductor, setCurrentConductor] = useState({});
  const [conductorLoggedIn, setConductorLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  console.log(allConductors);
  console.log("This is current conductor", currentConductor);

  /********************ADMIN FUNCTIONALITY*********************/

  //will be used for fetching all the conductors for the admin
  const fetchConductors = async () => {
    try {
      const res = await fetch(`http://localhost:3000/admin`);
      const data = await res.json();
      if (data) {
        let newAllConductor = [...data.data];
        setAllConductors(newAllConductor);
      } else {
        Alert("You are not allowed for this operation");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  //delete conductor from the database
  const handleConductorDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/admin/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data) {
        const newAllConductors = allConductors.filter(
          (conductor) => conductor.id != id
        );
        setAllConductors(newAllConductors);
      } else {
        alert("Not able to delete data");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  //add conductor to the database
  const handleAddConductor = async (dataObj) => {
    try {
      const res = await fetch(`http://localhost:3000/admin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataObj),
      });

      const data = await res.json();
      if (data) {
        setAllConductors((preVal) => preVal.push(data.data));
      } else {
        console.log("Not able to add conductor");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  /*****************CONDUCTOR FUNCTIONALITY*********************/

  //conductorLogin
  const handleConductorLogin = async (dataObj) => {
    try {
      const res = await fetch(
        `http://localhost:3000/conductor/conductor-login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataObj),
        }
      );

      const data = await res.json();

      if (data) {
        localStorage.setItem("conductorAuthToken", data.conductorAuthToken);

        if (localStorage.getItem("conductorAuthToken")) {
          getConductorProfile();
        }
      }

      return;
    } catch (error) {
      console.log(error.message);
      return;
    }
  };

  //conductorProfile
  const getConductorProfile = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/conductor/conductor-profile`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Headers": "*",
          },
          body: JSON.stringify({
            conductorAuthToken: localStorage.getItem("conductorAuthToken"),
          }),
        }
      );
      const data = await res.json();
      if (data) {
        console.log("This is condutor data", data);
        setCurrentConductor(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  /*****************USER FUNCTIONALITY*********************/
  //will add user to the userModel
  const postUser = async (userData) => {
    try {
      const res = await fetch(`http://localhost:3000/user/user-signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await res.json();
      if (data) {
        console.log("user added successfully ", data);
      } else {
        console.log("Not able to add conductor");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  //get user profile after logged in.

  const getUserProfile = async () => {
    try {
      const authToken = localStorage.getItem("authToken");

      console.log(
        "This is localstorage getItem authToken in the frontend",
        authToken
      );
      const res = await fetch(`http://localhost:3000/user/user-profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "*",
        },

        body: JSON.stringify({ authToken }),
      });
      const data = await res.json();
      if (data) {
        console.log(data);
        setCurrentUser({ ...data.user });
      }
    } catch (error) {
      console.log(error);
    }
  };

  //get user from the database
  const userLogin = async (loginData) => {
    try {
      const res = await fetch(`http://localhost:3000/user/user-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
        withCredentials: true,
      });
      const data = await res.json();
      if (data) {
        localStorage.setItem("authToken", data.authToken);
        localStorage.setItem("userEmail", loginData.email);
      }
      return;
    } catch (error) {
      console.log(error);
      return;
    }
  };
  //logout user
  const handleUserLogout = async () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    setCurrentUser({});
  };

  return (
    <Context.Provider
      value={{
        allConductors,
        fetchConductors,
        handleConductorDelete,
        handleAddConductor,
        handleConductorLogin,
        getConductorProfile,
        currentConductor,
        conductorLoggedIn,
        setConductorLoggedIn,
        getUserProfile,
        setCurrentConductor,
        postUser,
        userLogin,
        currentUser,
        handleUserLogout,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { ContextProvider, Context };
