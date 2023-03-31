import { Card, Stack } from "@mui/material";
import "./App.css";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Admin from "./screens/Admin/Admin";
import AllConductors from "./screens/Admin/AllConductors";
import Conductor from "./screens/ConductorPage/Conductor";
import ConductorLogin from "./screens/ConductorPage/ConductorLogin";
import Home from "./screens/Home/Home";
import SignIn from "./screens/SignIn/SignIn";
import SignUp from "./screens/SignUp/SignUp";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import busImg from "./assets/bus-home.jpg";

function App() {
  return (
    <div className="App">
      <Header />
      <Stack direction="row" justifyContent="space-evenly">
        <div className="shadow homeCard" sx={{ margin: "1rem" }}>
          <img src={busImg} className="homeImg" alt="" />
        </div>
        <Router>
          <Routes>
            <Route exact path="/" element={<SignIn />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/admin" element={<Admin />} />
            <Route exact path="/conductor-login" element={<ConductorLogin />} />
            <Route exact path="/conductor" element={<Conductor />} />
            <Route exact path="/all-conductors" element={<AllConductors />} />
          </Routes>
        </Router>
      </Stack>

      <Footer />
    </div>
  );
}

export default App;
