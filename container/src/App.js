import React, { lazy, Suspense, useState } from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  Router,
  Redirect,
} from "react-router-dom";
import Progress from "./components/Progress";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
import Header from "./components/Header";
import { createBrowserHistory } from "history";
import { useEffect } from "react";

const generateClassName = createGenerateClassName({
  productionPrefix: "cn",
});

const history = createBrowserHistory();

const MarketingApp = lazy(() => import("./components/MarketinApp"));
const AuthApp = lazy(() => import("./components/AuthApp"));
const DashboardApp = lazy(() => import("./components/DashboardApp"));

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      history.push("/dashboard");
    }
  }, [isSignedIn]);

  return (
    <StylesProvider generateClassName={generateClassName}>
      <Router history={history}>
        <div>
          <Header
            isSignedIn={isSignedIn}
            onSignOut={() => setIsSignedIn(false)}
          />
          <Suspense fallback={<Progress />}>
            <Switch>
              <Route path="/auth">
                <AuthApp onSignIn={() => setIsSignedIn(true)} />
              </Route>
              <Route path="/dashboard">
                {!isSignedIn && <Redirect to="/" />}
                <DashboardApp />
              </Route>
              <Route path="/">
                <MarketingApp />
              </Route>
            </Switch>
          </Suspense>
        </div>
      </Router>
    </StylesProvider>
  );
};
