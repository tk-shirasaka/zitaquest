import React from "react";

import { Grid, Typography } from "@material-ui/core";

import { GameStartComponent } from "./Start";
import { GameFindComponent } from "./Find";
import { GameAnswerComponent } from "./Answer";

interface Props {
}

interface States {
}

export class GameComponent extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <>
        <Typography variant="h1" gutterBottom>
          <Grid container justify="center" spacing={2}>
            <Grid className="text-info" item xs>ジ</Grid>
            <Grid className="text-info" item xs>タ</Grid>
            <Grid className="text-info" item xs>ク</Grid>
            <Grid className="text-secondary" item xs>エ</Grid>
            <Grid className="text-secondary" item xs>ス</Grid>
            <Grid className="text-secondary" item xs>ト</Grid>
          </Grid>
        </Typography>

        <GameStartComponent />
        <GameFindComponent />
        <GameAnswerComponent />
      </>
    );
  }
}
