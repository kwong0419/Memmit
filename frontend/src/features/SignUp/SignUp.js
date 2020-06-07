import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { apiURL } from "../../util/apiURL";
import { signUp } from "../../util/firebaseFunctions";
import "../../css/LoginSignup.css";
import { NavLink } from "react-router-dom";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const history = useHistory();
  const API = apiURL();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let usernameAuth = await axios.get(`${API}/users/search/${username}`);
      if (usernameAuth.data.status === "Success") {
        setError("Username already exists. Please try another username");
      } else {
        let res = await signUp(email, password);
        await axios.post(`${API}/users`, {
          id: res.user.uid,
          email,
          username,
          password,
        });
        history.push("/");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="signup">
      <img
        className="banner1"
        alt="art"
        src="https://www.redditstatic.com/accountmanager/bbb584033aa89e39bad69436c504c9bd.png"
      />
      <div className="formDiv">
        <img
          className="logoForm"
          alt="logo"
          src="https://www.redditinc.com/assets/images/site/reddit-logo.png"
        />
        <h1>Create an Account</h1>
        {error ? <div>{error}</div> : null}
        <form className="form" onSubmit={handleSubmit}>
          <input
            required
            id="signupEmail"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <br />
          <br />
          <input
            required
            id="signupUsername"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.currentTarget.value)}
          />
          <br />
          <br />
          <input
            required
            id="signupPassword"
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <br />
          <br />
          <button id="signupBtn" type="submit">
            Sign Up
          </button>
          <br />
          <br />
          <div className="bottomLink">
            <p>Already a redditor?</p>
            <NavLink to={"/login"}>LOGIN</NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}
