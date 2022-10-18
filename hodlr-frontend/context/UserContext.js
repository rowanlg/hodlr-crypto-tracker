import React, { createContext, useEffect, useReducer } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const initialState = null;
  const [token, setToken] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const localTokenState = localStorage.getItem("usertoken");
    if (localTokenState) {
      setToken(localTokenState);
    }
    setLoading(false);
  }, []);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const requestOptions = {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: "Bearer " + token,
  //       },
  //     };

  //     const response = await fetch(
  //       "http://localhost:8000/api/users/me",
  //       requestOptions
  //     );

  //     if (!response.ok) {
  //       setToken(null);
  //     }
  //     if (typeof window !== "undefined") {
  //       console.log("triggered in context");
  //       console.log(token);
  //       const timeout = setTimeout(() => {
  //         localStorage.setItem("usertoken", token);
  //       }, 5000);
  //     }
  //   };
  //   fetchUser();
  // }, [token]);

  return (
    <UserContext.Provider value={[token, setToken]}>
      {loading ? null : props.children}
    </UserContext.Provider>
  );
};
