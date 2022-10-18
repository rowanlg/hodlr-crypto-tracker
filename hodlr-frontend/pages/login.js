import React from "react";
import styled from "styled-components";
import colours from "../components/colours";
import Login from "../components/Login";
import Register from "../components/Register";

const LoginRegisterContainer = styled.div`
  background-color: ${colours.darkBlue};
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  .center {
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    width: 90%;
    max-width: 700px;
    /* border: 1px solid red; */
  }
`;

const login = () => {
  return (
    <LoginRegisterContainer>
      <div className="center">
        <Register />
        <Login />
      </div>
    </LoginRegisterContainer>
  );
};

export default login;
