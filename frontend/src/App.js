import React from "react";
import { Route } from "react-router-dom";
import NavBar from "./features/NavBar";
import Home from "./features/posts/Home";
import Login from "./features/login/Login";
import SignUp from "./features/signUp/SignUp";
import CreatePost from "./features/posts/CreatePost";
import CreateSubmemmit from "./features/submemmits/CreateSubmemmit";
import "./App.css";
import AuthProvider from "./providers/AuthContext";
import { AuthRoute, ProtectedRoute } from "./util/routesUtil";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <NavBar />
        <Route exact path="/">
          <Home />
        </Route>
        <ProtectedRoute exact path="/createSubmemmit">
          <CreateSubmemmit />
        </ProtectedRoute>
        <ProtectedRoute exact path="/createPost">
          <CreatePost />
        </ProtectedRoute>
        <AuthRoute exact path="/login">
          <Login />
        </AuthRoute>
        <AuthRoute exact path="/signup">
          <SignUp />
        </AuthRoute>
      </AuthProvider>
    </div>
  );
}

export default App;
