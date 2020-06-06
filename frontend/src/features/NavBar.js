import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "../css/NavBar.css";
import { logout } from "../util/firebaseFunctions";
import { AuthContext } from "../providers/AuthContext";
import SearchForm from "./Search/SearchForm";

export default function NavBar() {
  const { currentUser } = useContext(AuthContext);
  const displayButtons = () => {
    if (currentUser) {
      return (
        <button className="logoutBtn" onClick={logout}>
          Logout
        </button>
      );
    } else {
      return (
        <div className="loginSignupBtns">
          <NavLink className="loginBtn" exact to={"/login"}>
            log in
          </NavLink>
          <NavLink className="signupBtn" exact to={"/signup"}>
            sign up
          </NavLink>
        </div>
      );
    }
  };
  return (
    <nav>
      <NavLink className="homeNavLink" exact to={"/"} id="homeAnchor">
        <img
          id="navLogo"
          alt="logo"
          src="https://www.redditinc.com/assets/images/site/reddit-logo.png"
        />
        Memmit
      </NavLink>
      <SearchForm />
      {displayButtons()}
    </nav>
  );
}
