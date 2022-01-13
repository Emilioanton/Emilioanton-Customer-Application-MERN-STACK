import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  const { isAuthenticated, user } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isAuthenticated) return <Navigate to={{ path: "/", state: { from: props.location } }} />;

        if (!roles.includes(user.role)) return <Navigate to={{ path: "/", state: { from: props.location } }} />;
        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
