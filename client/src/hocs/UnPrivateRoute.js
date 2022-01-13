import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const UnPrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated) return <Navigate to={{ path: "/", state: { from: props.location } }} />;

        return <Component {...props} />;
      }}
    />
  );
};

export default UnPrivateRoute;
