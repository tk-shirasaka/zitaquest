import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import { TopComponent } from "./Top";
import { SettingComponent } from "./Setting";

export const AppComponent = () => (
  <Router>
    <Switch>
      <Redirect exact from="/" to="/top" />
      <Route path="/top">
        <TopComponent />
      </Route>

      <Route path="/maintenance">
      </Route>

      <Route path="/setting">
        <SettingComponent />
      </Route>

      <Route path="/game">
      </Route>
    </Switch>
  </Router>
)
