import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSession } from "../firebase/UserProvider";

const LoginRoute = ({ component: Component, ...rest }) => {
  const { user } = useSession();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!!user) {
          return <Redirect to="/" />;
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
};

export default LoginRoute;
