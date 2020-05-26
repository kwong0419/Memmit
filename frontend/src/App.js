import React from "react";
import { Route } from "react-router-dom";
import NavBar from "./features/NavBar";
import Home from "./features/Home/Home";
import Login from "./features/Login/Login";
import SignUp from "./features/SignUp/SignUp";
import "./App.css";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/signup">
        <SignUp />
      </Route>
    </div>
  );
}

export default App;
