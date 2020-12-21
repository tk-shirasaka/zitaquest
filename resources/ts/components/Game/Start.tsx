import React from "react";

import { Grid, Button, Typography } from "@material-ui/core";

interface Props {
}

interface States {
}

export class GameStartComponent extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <Grid container justify="center">
        <Button variant="contained" color="secondary">
          <Typography variant="h2">スタート</Typography>
        </Button>
      </Grid>
    );
  }
}
