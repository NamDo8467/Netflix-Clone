import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import "./Login.css";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();
  const login = async (e) => {
    e.preventDefault();
    const email_error = document.createElement("p");
    email_error.className = "email-error";
    const password_error = document.createElement("p");
    password_error.className = "password-error";

    try {
      const result = await axios.post(
        "http://localhost:5500/login",
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      );
      
        
        history.push("/tvshows");
      
    } catch (error) {
      console.log(error);
      const login_error = error.response.data;
      const email_input = document.querySelector(".email");
      const password_input = document.querySelector(".password");

      if (login_error.email) {
        if (document.querySelector(".password-error")) {
          document.querySelector(".password-error").remove();
        }
        if (!document.querySelector(".email-error")) {
          email_error.textContent = `${login_error.email}`;
          email_input.before(email_error);
          email_input.style.marginBottom = "10px";
        }
      } else {
        if (document.querySelector(".email-error")) {
          document.querySelector(".email-error").remove();
        }
        if (!document.querySelector(".password-error")) {
          password_error.textContent = `${login_error.password}`;
          password_input.before(password_error);
          email_input.style.marginTop = "10px";
        }
      }
    }
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
            className="email"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            className="password"
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
