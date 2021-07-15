import React, { Fragment, useState, useEffect } from "react";
import Form from "./Form";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { PrivateRoute } from "../routers/PrivateRoute";
import { PublicRoute } from "../routers/PublicRoute";
import { DashBoardRoutes } from "../routers/DashBoardRoute";
import { PublicBoardRoutes } from "../routers/PublicBoardRoute";
const Main = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const state = useSelector((state) => state.auth);
  useEffect(() => {
    if (state.token && state.roll) {
      if (state.roll === "@admin/roll") {
        setIsLoggedIn(true);
        setIsAdmin(true);
      } else {
        setIsLoggedIn(true);
        setIsAdmin(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn, state]);
  return (
    <Fragment>
      <Router>
        <Switch>
          <PublicRoute
            path="/auth/login"
            isAutenticated={isLoggedIn}
            isAdmin={isAdmin}
            component={Form}
          />
          <PrivateRoute
            path="/private"
            isAutenticated={isLoggedIn && isAdmin}
            component={DashBoardRoutes}
          />
          <PrivateRoute
            path="/public"
            isAutenticated={isLoggedIn}
            component={PublicBoardRoutes}
          />
          <Redirect to="/auth/login" />
        </Switch>
      </Router>
    </Fragment>
  );
};

export default Main;
