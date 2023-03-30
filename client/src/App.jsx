import "./App.css";
import Admin from "./screens/Admin/Admin";
import AllConductors from "./screens/Admin/AllConductors";
import Conductor from "./screens/ConductorPage/Conductor";
import ConductorLogin from "./screens/ConductorPage/ConductorLogin";
import Home from "./screens/Home/Home";
import SignIn from "./screens/SignIn/SignIn";
import SignUp from "./screens/SignUp/SignUp";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
