import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./SignUp.css";
import axios from "axios";


function SignUp(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();
  const signUp = async () => {
    axios.post("http://localhost:5000/signup", {
      name: name,
      email: email,
      password: password,
    });
    history.push("/login")
  };
  return (
    <div className="signup-form-container">
      <div className="signup-form-main-content">
        <h1 className="signup-form-title">Sign Up</h1>
        <form className="signup-form">
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Email or phone number"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="signup-form-button" onClick={signUp}>
            Sign Up
          </button>
          <div className="already-have-an-account">
            <p>Already have an account?</p>
            <a href="/login" className="go-back-to-login-page">
              Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
