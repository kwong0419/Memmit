import React from "react";
import { NavLink } from "react-router-dom";
import "../css/NavBar.css";

export default function NavBar() {
  return (
    <nav>
      <NavLink exact to={"/"}>
        Home
      </NavLink>
      <NavLink exact to={"/users"}>
        Show All Users
      </NavLink>
      <NavLink exact to={"/login"}>
        Login
      </NavLink>
      <NavLink exact to={"/signup"}>
        Sign Up
      </NavLink>
    </nav>
  );
}
