import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import FormUser from "../components/FormUser";
import NavPrivate from "../components/NavPrivate";
export const DashBoardRoutes = () => {
  return (
    <>
      <NavPrivate />
      <div className="container">
        <Switch>
          <Route exact path="/private/home" component={Home} />
          <Route exact path="/private/register" component={FormUser} />
          <Redirect to="/private/home" />
        </Switch>
      </div>
    </>
  );
};
