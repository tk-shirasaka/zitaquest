import React from "react";
import { Link } from "react-router-dom";

import { Paper, Button } from "@material-ui/core";

interface Props {
}

interface States {
}

export class TopComponent extends React.Component<Props, States> {
  render() {
    return (
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col">
            <Paper className="m-2 p-2" elevation={3}>
              <Link to="/maintenance">
                <Button variant="contained" color="default">問題を作る</Button>
              </Link>
            </Paper>
          </div>
          <div className="col">
            <Paper className="m-2 p-2" elevation={3}>
              <Link to="/setting">
                <Button variant="contained" color="primary">ゲーム作る</Button>
              </Link>
            </Paper>
          </div>
          <div className="col">
            <Paper className="m-2 p-2" elevation={3}>
              <Link to="/game">
                <Button variant="contained" color="secondary">ゲームを始める</Button>
              </Link>
            </Paper>
          </div>
        </div>
      </div>
    );
  }
}
