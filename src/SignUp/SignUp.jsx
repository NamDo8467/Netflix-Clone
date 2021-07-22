import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./SignUp.css";
import axios from "axios";

function SignUp(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();
  const signUp = (e) => {
    e.preventDefault();

    const result = axios
      .post(
        "http://localhost:5500/signup",
        {
          name: name,
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      )
      .then((doc) => {
        console.log(doc.data);
        // history.push("/login");
      })
      .catch((error) => {
        const signup_error = error.response.data;
        const email_input = document.querySelector("#email");
        const password_input = document.querySelector("#password")

        if (signup_error.email) {
          if (document.querySelector(".password-error")) {
            document.querySelector(".password-error").remove()
          }
          if (!document.querySelector(".email-error")) {
            const email_error = document.createElement("p");
            email_error.className = "email-error";

            email_error.textContent = `${signup_error.email}`;
            email_input.before(email_error);
            email_input.style.marginBottom = "10px";
          }
        } else {
          if (document.querySelector(".email-error")) {
            document.querySelector(".email-error").remove()
          }
          if (!document.querySelector(".password-error")) {
            const password_error = document.createElement("p");
            password_error.className = "password-error";
            password_error.textContent = `${signup_error.password}`;
            password_input.before(password_error);
            email_input.style.marginTop = "10px";

            

          }
        }
      });
  };
  return (
    <div className="signup-form-container">
      <div className="signup-form-main-content">
        <h1 className="signup-form-title">Sign Up</h1>
        <form className="signup-form" onSubmit={signUp}>
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
            id="email"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
            id="password"
          />
          <button className="signup-form-button" type="submit">
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
