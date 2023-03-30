import React, { useState, useEffect } from "react";

import AbortController from "abort-controller";

const Context = React.createContext();

function ContextProvider({ children }) {
  const [allConductors, setAllConductors] = useState([]);
  const [currentConductor, setCurrentConductor] = useState();
  const [conductorLoggedIn, setConductorLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  console.log(allConductors);

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
      fetch(`http://localhost:3000/conductor/conductor-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
        body: JSON.stringify(dataObj),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "this is login data");
          setCurrentConductor(data.data);
          setConductorLoggedIn(true);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  //conductorProfile

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

  //get user from the database
  const getUserProfile = async (loginData) => {
    try {
      const res = await fetch(`http://localhost:3000/user/user-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });
      const data = await res.json();
      if (data) {
        setCurrentUser(data);
        console.log(data);
      }
      return;
    } catch (error) {
      console.log(error);
      return;
    }
  };
  //logout user
  const handleUserLogout = async () => {
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
        currentConductor,
        conductorLoggedIn,
        setCurrentConductor,
        postUser,
        getUserProfile,
        currentUser,
        handleUserLogout,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { ContextProvider, Context };
