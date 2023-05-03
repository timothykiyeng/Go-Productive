import React, {useState, useEffect} from 'react'

import SignUpForm from './SignUpForm'
import styled from "styled-components";

import LoginForm from './LoginForm';

const LandingPage = ({setIsAuthenticated, setUser}) => {

  const [showLogin, setShowLogin] = useState(true);
  




  return (
    <div className="login-form">
    <Wrapper>
      <Logo>Go Productive</Logo>
      <h2 className="tagline">
      You can only manage time if you track it right.
      </h2>
      {showLogin ? (
        <>
          <LoginForm  setIsAuthenticated={setIsAuthenticated} setUser={setUser}/>
          <Divider />
          <p className="accountquestion">Don't have an account?</p> &nbsp;
          <button className='button' onClick={() => setShowLogin(false)}>Sign Up</button>
        </>
      ) : (
        <>
          <SignUpForm setIsAuthenticated={setIsAuthenticated} setUser={setUser} />
          <Divider />
          <p className="accountquestion">Already have an account?</p> &nbsp;
          <button className='button' onClick={() => setShowLogin(true)}>Log In</button>
        </>
      )}
    </Wrapper>
  </div>
);

}

export default LandingPage

const Logo = styled.h1`
  font-family: "Cookie", cursive;
  color: white;
  text-shadow: 1px 1px 10px #03045E;
  font-size: 100px;
  margin: 8px 0 16px;
  text-align: center;
`;
const Wrapper = styled.section`
  max-width: 500px;
  margin: 40px auto;
  padding: 16px;
`;
const Divider = styled.hr`
  border: none;
  border-bottom: 1px solid #ccc;
  margin: 16px 0;
`;
