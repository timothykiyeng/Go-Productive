import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import "../styles.css"

// import button from '../Styling/Button';



const LoginForm = ({ setUser, setIsAuthenticated }) => {
  const navigate = useNavigate()
  // const [name, setName] = useState<string>("");
  // const [password, setPassword] = useState<string>("");
  //const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    name: '',
    password: '',
  })

  const handleChange = (e) => {
    const {name, value} = e.target
    setLoginData(loginData => ({...loginData, [name]: value}) )
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch('http://127.0.0.1:3000/login',{
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body:JSON.stringify(loginData),
    })
    .then(r => {
      if(r.ok){
        r.json()
        .then(user => {
          setUser(user)
          setIsAuthenticated(true)
        }).then(() => navigate('/'))
      } else{
        (alert("unauthorized"))
      }
    })
  }
  
  return (
    <>
    <form onSubmit={handleSubmit}>
      <form>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          autoComplete="off"
          value={loginData.name}
          onChange={handleChange}
        />
      </form>
      <form>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          value={loginData.password}
          onChange={handleChange}
        />
      </form>
      <button className="login-button" color="primary" type="submit">
        {isLoading ? "Loading..." : "Login"}
      </button>
      {/* <form>
                {errors.map((err) => (
                    <error key={err}>{err}</error>
                ))}
            </form> */}
    </form>
    </>
  );
};
export default LoginForm;
