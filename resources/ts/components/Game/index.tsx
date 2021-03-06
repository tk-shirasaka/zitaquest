import React from "react";

import { Grid, Typography } from "@material-ui/core";

import { GameService, IGame } from "../../service/Game";
import { GameStartComponent } from "./Start";
import { GameAnswerComponent } from "./Answer";
import { GameFindComponent } from "./Find";

interface Props {
}

interface States {
  game?: IGame;
}

export class GameComponent extends React.Component<Props, States> {
  private gameService: GameService = new GameService;

  constructor(props: Props) {
    super(props);

    this.state = {};
    this.gameService.index().then(res => {
      this.setState({ game: res.data });
    });
  }

  private refresh(game: IGame) {
    this.setState({ game });
  }

  private renderComponent(game: IGame) {
    if (game.active?.state === 0) {
      return <GameAnswerComponent record={game.active} refresh={this.refresh.bind(this)} />;
    } else if (game.active?.state === 1) {
      return <GameFindComponent record={game.active} refresh={this.refresh.bind(this)} />;
    } else {
      return <GameStartComponent game={game} refresh={this.refresh.bind(this)} />;
    }
  }

  render() {
    if (!this.state.game) return null;

    return (
      <>
        <Typography variant="h1" gutterBottom style={{ fontFamily: "Nico Moji" }}>
          <Grid container justify="center" spacing={2}>
            <Grid className="text-info" item xs>ジ</Grid>
            <Grid className="text-info" item xs>タ</Grid>
            <Grid className="text-info" item xs>ク</Grid>
            <Grid className="text-secondary" item xs>エ</Grid>
            <Grid className="text-secondary" item xs>ス</Grid>
            <Grid className="text-secondary" item xs>ト</Grid>
          </Grid>
        </Typography>

        { this.renderComponent(this.state.game) }
      </>
    );
  }
}
