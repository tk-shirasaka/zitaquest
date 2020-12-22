import React from "react";

import { Grid, Button, Typography } from "@material-ui/core";

import { GameService, IGame } from "../../service/Game";

interface Props {
  game: IGame;
  refresh: (game: IGame) => void;
}

interface States {
}

export class GameStartComponent extends React.Component<Props, States> {
  private gameService: GameService = new GameService;

  constructor(props: Props) {
    super(props);
  }

  onStart() {
    this.gameService.start().then(res => {
      this.props.refresh(res.data);
    });
  }

  render() {
    return (
      <Grid container justify="center">
        <Button variant="contained" color="secondary" onClick={this.onStart.bind(this)}>
          <Typography variant="h2">スタート</Typography>
        </Button>
      </Grid>
    );
  }
}
