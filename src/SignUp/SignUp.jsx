import React from "react";
import "./SignUp.css";

function SignUp() {
  return (
    <div className="signup-form-container">
      <div className="signup-form-main-content">
        <h1 className="signup-form-title">Sign In</h1>
        <form className="signup-form">
          <input type="text" placeholder="Name" />
          <input type="text" placeholder="Email or phone number" />
          <input type="password" placeholder="Password" />
          <button className="signup-form-button">Sign Up</button>
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
