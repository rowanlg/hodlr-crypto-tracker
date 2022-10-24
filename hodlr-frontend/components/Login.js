import React from "react";
import styled from "styled-components";
import colours from "../components/colours";
import { UserContext } from "../context/UserContext";
import { useRouter } from "next/router";

const Login = () => {
  const [loginDetails, setLoginDetails] = React.useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = React.useState("");
  const [autofill, setAutofill] = React.useState(false);
  const [, setToken] = React.useContext(UserContext);
  const router = useRouter();

  // Login fetches a token from backend, if there is a token route to investments
  const submitLogin = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: JSON.stringify(
        `grant_type=&username=${loginDetails.email}&password=${loginDetails.password}&scope=&client_id=&client_secret=`
      ),
    };

    const response = await fetch("/api/token", requestOptions);
    const data = await response.json();

    if (!response.ok) {
      setErrorMessage(data.detail);
    } else {
      setToken(data.access_token);
      localStorage.setItem("usertoken", data.access_token);
      router.push("/investments");
    }
  };

  // Submit the login function
  const handleSubmit = (e) => {
    e.preventDefault();
    submitLogin();
  };

  // Logic to autofill for demo account
  React.useEffect(() => {
    if (autofill) {
      setLoginDetails({
        email: "example@example.com",
        password: "secretpassword",
      });
    } else {
      setLoginDetails({});
    }
  }, [autofill]);

  return (
    <LoginContainer>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <label>
            Email
            <input
              type="text"
              name="name"
              value={loginDetails.email}
              onChange={(e) => {
                setAutofill(false);
                setLoginDetails((prev) => ({
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
              value={loginDetails.password}
              onChange={(e) => {
                setAutofill(false);
                setLoginDetails((prev) => ({
                  ...prev,
                  password: e.target.value,
                }));
              }}
            />
          </label>
          {errorMessage ? <p>{errorMessage}</p> : null}
          <button
            className="save"
            type="submit"
            disabled={
              !loginDetails.email || !loginDetails.password ? "disabled" : ""
            }
          >
            Login
          </button>
          <p>
            <span onClick={() => setAutofill(true)}>Autofill</span> Demo
            Credentials?
          </p>
        </form>
      </div>
    </LoginContainer>
  );
};

export default Login;

const LoginContainer = styled.div`
  /* width: 50%; */
  /* height: 50%; */
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
      span {
        text-decoration: underline;
        cursor: pointer;
        color: ${colours.orange};
      }
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
