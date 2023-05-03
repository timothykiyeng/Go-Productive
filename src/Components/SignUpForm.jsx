import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles.css"

const SignUpForm = ({ setIsAuthenticated, setUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target
    setSignupData(signupData => ({...signupData, [name]: value}) )
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (confirmPassword !== signupData.password) {
      alert("Passwords dont' match!");
    }

    fetch("http://127.0.0.1:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(signupData),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user);
          setIsAuthenticated(true);
          navigate("/");
        });
      } else {
        r.json().then((json) => console.log("Unauthorized"));
      }
    });
  };

  return (
    <div>
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <br />
        <input
          type="text"
          name="name"
          value={signupData.name}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="email">Email</label>
        <br />
        <input
          type="text"
          name="email"
          value={signupData.email}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input
          type="password"
          name="password"
          value={signupData.password}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="confirm password">Confirm Password</label>
        <input
          type="password"
          name="confirm-password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <br />
        <button className="signup-button" type="submit">
          Signup
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
