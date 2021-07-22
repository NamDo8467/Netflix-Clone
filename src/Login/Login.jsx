import React, { useState } from "react";
import "./Login.css";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login =  async (e) => {
    e.preventDefault();
    axios.post("http://localhost:5500/login", {
      email: email,
      password: password,
    }).then(result => {
      console.log(result.data);
    }).catch(err => {
      console.log(err);
    })

    
  };
  return (
    <div className="login-form-container">
      <div className="login-form-main-content">
        <h1 className="login-form-title">Sign In</h1>
        <form className="login-form">
          <input
            type="text"
            placeholder="Email or phone number"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
          <button className="login-form-button" onClick={login}>
            Sign In
          </button>
          <div className="login-form-help">
            <div className="remember-me">
              <input type="checkbox" />
              <label>Remember me</label>
            </div>
            <a href="" className="need-help">
              Need help?
            </a>
          </div>
        </form>

        <div className="login-form-other-options">
          <div className="login-with-facebook">
            <a href="">Login with Facebook</a>
          </div>
          <div className="signup-now">
            New to Netflix?
            <a href="/signup">Sign up now</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
