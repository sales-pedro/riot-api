import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSession } from "../firebase/UserProvider";

const AuthRoute = ({ component: Component, ...rest }) => {
  const { user } = useSession();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!!user) {
          return <Component {...props} />;
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

export default AuthRoute;
