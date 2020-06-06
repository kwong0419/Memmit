import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { login } from "../../util/firebaseFunctions";
import "../../css/LoginSignup.css";
import { NavLink } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      history.push("/");
      window.location.reload();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login">
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
        <h1>Sign in</h1>
        {error ? <div>{error}</div> : null}
        <form className="form" onSubmit={handleSubmit}>
          <input
            id="loginEmail"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <br />
          <br />
          <input
            type="password"
            id="loginPassword"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <br />
          <br />
          <button id="loginBtn" type="submit">
            SIGN IN
          </button>
          <div className="bottomLink">
            <p>New to Memmit?</p>
            <NavLink to={"/signup"}>SIGN UP</NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}
