import React from "react";
import { Redirect, Route } from "react-router";

export const PublicRoute = ({
  isAutenticated,
  isAdmin,
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      component={(props) => {
        if (isAutenticated) {
          if (isAdmin) {
            return <Redirect to="/private" />;
          }
          return <Redirect to="/public" />;
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
};
