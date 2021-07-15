import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import NavPublic from "../components/NavPublic";
import Quiz from "../components/Quiz";
import Report from "../components/Report";
export const PublicBoardRoutes = () => {
  return (
    <>
      <NavPublic />
      <div className="container">
        <Switch>
          <Route exact path="/public/quiz" component={Quiz} />
          <Route exact path="/public/result" component={Report} />
          <Redirect to="/public/quiz" />
        </Switch>
      </div>
    </>
  );
};
