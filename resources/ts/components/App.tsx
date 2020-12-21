import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import { TopComponent } from "./Top";
import { QuestionComponent } from "./Question";
import { QuestComponent } from "./Quest";
import { GameComponent } from "./Game";

export const AppComponent = () => (
  <Router>
    <Switch>
      <Redirect exact from="/" to="/top" />
      <Route path="/top">
        <TopComponent />
      </Route>

      <Route path="/question">
        <QuestionComponent />
      </Route>

      <Route path="/quest">
        <QuestComponent />
      </Route>

      <Route path="/game">
        <GameComponent />
      </Route>
    </Switch>
  </Router>
)
