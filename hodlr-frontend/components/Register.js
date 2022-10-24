import React from "react";
import styled from "styled-components";
import colours from "../components/colours";
import { UserContext } from "../context/UserContext";

const Register = () => {
  const [registerDetails, setRegisterDetails] = React.useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = React.useState("");
  const [, setToken] = React.useContext(UserContext);

  // POST creates a user and fetches a token
  const submitRegistration = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: registerDetails.email,
        hashed_password: registerDetails.password,
      }),
    };

    const response = await fetch("/api/users", requestOptions);
    const data = await response.json();

    if (!response.ok) {
      setErrorMessage(data.detail);
    } else {
      setToken(data.access_token);
      window.location.reload();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitRegistration();
  };

  return (
    <RegisterContainer>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <h2>Register</h2>
          <label>
            Email Address
            <input
              type="email"
              name="email"
              onChange={(e) => {
                setRegisterDetails((prev) => ({
                  ...prev,
                  email: e.target.value,
                }));
              }}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              onChange={(e) => {
                setRegisterDetails((prev) => ({
                  ...prev,
                  password: e.target.value,
                }));
              }}
            />
          </label>
          <label>
            Confirm Password
            <input
              type="password"
              name="password-confirm"
              onChange={(e) => {
                setRegisterDetails((prev) => ({
                  ...prev,
                  password_confirm: e.target.value,
                }));
              }}
            />
          </label>
          {errorMessage ? <p>{errorMessage}</p> : null}
          <button
            className="save"
            type="submit"
            disabled={
              registerDetails.password === registerDetails.password_confirm &&
              registerDetails.password &&
              registerDetails.email
                ? null
                : "disabled"
            }
          >
            Login
          </button>
        </form>
      </div>
    </RegisterContainer>
  );
};

export default Register;

const RegisterContainer = styled.div`
  padding: 50px 70px;
  background-color: ${colours.mainBlue};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${colours.borderRadius};
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p {
      font-size: 0.7rem;
    }
    .save {
      margin: 10px;
      background-color: ${colours.darkBlue};
      border: none;
      padding: 5px 15px;
      border-radius: 5px;
      cursor: pointer;
    }

    label {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      margin: 10px;
      font-size: 0.8rem;
      input {
        margin: 5px 0;
        width: 170px;
        background-color: inherit;
        border: none;
        border-bottom: 1px solid ${colours.veryDeactivated};
      }
    }
  }
`;
