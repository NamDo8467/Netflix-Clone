import React, { useState } from "react";
import "./Login.css";
import axios from "axios";

function Login() {
  return (
    <div className="login-form-container">
      <div className="login-form-main-content">
        <h1 className="login-form-title">Sign In</h1>
        <form className="login-form">
          <input type="text" placeholder="Email or phone number" required />
          <input type="password" placeholder="Password" required />
          <button className="login-form-button" type="submit">
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
