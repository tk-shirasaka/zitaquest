import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import { TopComponent } from "./Top";
import { QuestComponent } from "./Quest";

export const AppComponent = () => (
  <Router>
    <Switch>
      <Redirect exact from="/" to="/top" />
      <Route path="/top">
        <TopComponent />
      </Route>

      <Route path="/question">
      </Route>

      <Route path="/quest">
        <QuestComponent />
      </Route>

      <Route path="/game">
      </Route>
    </Switch>
  </Router>
)
