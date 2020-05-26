import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { apiURL } from "../../util/apiURL";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const history = useHistory();
  const API = apiURL();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // sign up with firebase and send results to our backend
      history.push("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <h1>Sign Up!</h1>
      {error ? <div>{error}</div> : null}
      <form onSubmit={handleSubmit}>
        <label for="signUpEmail">Email: </label>
        <input
          id="signUpEmail"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <label for="signUpPassword">Password: </label>
        <input
          id="signUpPassword"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
}
