import React from "react";
import { Link } from "react-router-dom";

import { Grid, Paper, Button } from "@material-ui/core";

interface Props {
}

interface States {
}

export class TopComponent extends React.Component<Props, States> {
  render() {
    return (
      <>
        <Grid container spacing={2}>
          <Grid item xs>
            <Paper className="p-3" elevation={3}>
              <Link to="/question">
                <Button variant="contained" color="default">問題を作る</Button>
              </Link>
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper className="p-3" elevation={3}>
              <Link to="/quest">
                <Button variant="contained" color="primary">ゲーム作る</Button>
              </Link>
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper className="p-3" elevation={3}>
              <Link to="/game">
                <Button variant="contained" color="secondary">ゲームを始める</Button>
              </Link>
            </Paper>
          </Grid>
        </Grid>
      </>
    );
  }
}
