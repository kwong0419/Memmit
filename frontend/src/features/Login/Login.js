import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // log in with firebase and then change route
      history.push("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <h1>Login!</h1>
      {error ? <div>{error}</div> : null}
      <form onSubmit={handleSubmit}>
        <label for="loginEmail">Email: </label>
        <input
          id="loginEmail"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <label for="loginPassword">Password: </label>
        <input
          id="loginPassword"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
}
