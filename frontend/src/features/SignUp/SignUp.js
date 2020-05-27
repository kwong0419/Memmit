import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { apiURL } from "../../util/apiURL";
import { signUp } from "../../util/firebaseFunctions";
import "../../css/SignUp.css";

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
        await axios.post(`${API}/users`, { email, username, password });
        history.push("/");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <h1>Sign Up!</h1>
      {error ? <div>{error}</div> : null}
      <form className="signUpForm" onSubmit={handleSubmit}>
        <label for="signUpEmail">Email: </label>
        <input
          required
          id="signUpEmail"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <label for="signUpUsername">Username: </label>
        <input
          required
          id="signUpUsername"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.currentTarget.value)}
        />
        <label for="signUpPassword">Password: </label>
        <input
          required
          id="signUpPassword"
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
}
